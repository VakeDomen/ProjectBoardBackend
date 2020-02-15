const express = require("express");
const router = express.Router();
import { Project } from '../models/project';
import { fetch, fetchAll, insert } from '../db/database.handler';
import * as config from '../config.json';

router.get("/projects", async (req: any, resp: any) => {
    const projects = await fetchAll(config.db.tables.projects);
    resp.send({
        message: 'Success',
        data: projects,
    });
})

router.post("/projects", async (req: any, resp: any) => {
    let project = new Project(req.body);
    project.generateId();
    let response = await insert(config.db.tables.projects, project)
    resp.send({
        message: response
    });
})


module.exports = router;