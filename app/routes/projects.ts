const express = require("express");
const router = express.Router();
import { Project } from '../models/project';
import { fetch, fetchAll, insert, update } from '../db/database.handler';
import * as config from '../config.json';
import { DbItem } from '../models/db.item';

router.get("/projects", async (req: any, resp: any) => {
    const projects = await fetch(config.db.tables.projects, new Project({private: false}));
    resp.status(200);
    resp.send({
        message: 'Success',
        data: projects,
    });
});

router.get("/projects/:id", async (req: any, resp: any) => {
    if (!req.params['id']) {
        resp.status(404);
        resp.send({
            message: 'Not found! No target!',
            data: [],
        });    
    }
    const projects = await fetch(config.db.tables.projects, new Project({id: req.params['id']}));
    resp.status(200);
    resp.send({
        message: 'Success',
        data: projects,
    });
});

router.post("/projects", async (req: any, resp: any) => {
    let project = new Project(req.body);
    project.generateId();
    let response = await insert(config.db.tables.projects, project);
    resp.status(201);
    resp.send({
        message: "Successfuly created resource!",
        data: [project]
    });
});

router.patch("/projects/:id", async (req: any, resp: any) => {
    let project: DbItem | undefined = (await fetch(config.db.tables.projects, new DbItem(req.params['id']))).pop();
    if (!project) {
        resp.status(404);
        resp.send({
            message: 'Not found! No target!',
            data: false,
        });  
    }
    project = new Project(project);
    project.updateValues(req.body);
    await update(config.db.tables.projects, project)
    .catch(err => {
        resp.status(500);
        resp.send({
            message: "Errror",
            error: err
        })
    });
    resp.send({
        message: 'Success',
        data: project
    });
});


module.exports = router;