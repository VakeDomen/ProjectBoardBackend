import * as express from 'express';
const router = express.Router();
const ping = require("ping");
import * as config  from '../config.json';
import { Project } from '../models/project.item';
import { fetch } from '../db/database.handler';
import { ErrorResponse } from '../models/error.response';
import { SuccessResponse } from '../models/success.response';

router.get("/projects/ping/:id", async (req: express.Request, resp: express.Response) => {
    if (!req.params['id']) {
        new ErrorResponse(404, 'Not found!').send(resp);
    }
    const projects = await fetch(config.db.tables.projects, new Project({id: req.params['id']}));
    const project = new Project(projects.pop());
    ping.sys.probe(project.url, function(isAlive) {
        var msg = isAlive ? 'host ' + project.url + ' is alive' : 'host ' + project.url + ' is dead';
        new SuccessResponse(200, msg).setData(isAlive).send(resp);
    });
});

module.exports = router;