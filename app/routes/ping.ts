const express = require("express");
const router = express.Router();
const ping = require("ping");
import * as config  from '../config.json';
import { Project } from '../models/project';
import { fetch } from '../db/database.handler';

router.get("/projects/ping/:id", async (req, resp) => {
    if (!req.params['id']) {
        resp.status(404);
        resp.send({
            message: 'Not found! No target!',
            data: [],
        });    
    }
    const projects = await fetch(config.db.tables.projects, new Project({id: req.params['id']}));
    const project = new Project(projects.pop());
    ping.sys.probe(project.url, function(isAlive) {
        var msg = isAlive ? 'host ' + project.url + ' is alive' : 'host ' + project.url + ' is dead';
        resp.status(200);
        resp.send({
            message: msg,
            data: isAlive
        })
    });
});

module.exports = router;