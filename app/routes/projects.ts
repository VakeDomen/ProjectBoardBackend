import * as express from 'express';
import { Project } from '../models/project.item';
import { fetch, insert, update } from '../db/database.handler';
import * as config from '../config.json';
import { DbItem } from '../models/db.item';
import { SuccessResponse } from '../models/success.response';
import { ErrorResponse } from '../models/error.response';
import { Response } from '../models/response';
import { verifyTokenMiddleware } from '../auth/local.util';
import { User } from '../models/user.item';

const router = express.Router();
router.get("/projects", async (req: express.Request, resp: express.Response) => {
    const projects = await fetch(config.db.tables.projects, new Project({private: false}));
    new SuccessResponse().setData(projects).send(resp);
});

router.get("/projects/:id", async (req: express.Request, resp: express.Response) => {
    if (!req.params['id']) {
        new SuccessResponse(404, 'No projects found!').send(resp);
    }
    const projects = await fetch(config.db.tables.projects, new Project({id: req.params['id']}));
    new SuccessResponse().setData(projects).send(resp);
});

router.post("/projects", verifyTokenMiddleware, async (req: express.Request, resp: express.Response) => {
    let user: User = req['loggedUser'];
    let project = new Project(req.body);
    project.owner = <string>user.id;
    project.generateId();
    let response = await insert(config.db.tables.projects, project);
    new SuccessResponse(201, 'Successfully created resource!', [project]).send(resp);
});

router.patch("/projects/:id", async (req: express.Request, resp: express.Response) => {
    let project: DbItem | undefined = (await fetch(config.db.tables.projects, new DbItem(req.params['id']))).pop();
    if (!project) {
        new Response(404, 'No projects found!').send(resp);
    }
    project = new Project(project);
    project.updateValues(req.body);
    await update(config.db.tables.projects, project)
    .catch(err => {
        new ErrorResponse().setError(err).send(resp);
    });
    new SuccessResponse().setData([project]).send(resp);
});

module.exports = router;