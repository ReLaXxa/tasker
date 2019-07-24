const routes = require('express').Router();
const tasksModel = require('../models/tasks');
module.exports = (checkToken, db) => {
    routes.get("/", async (req, res, next) => {
        try {
            await tasksModel.getAllTasks(db).then((items) => res.json({ items }))
        } catch (error) {
            console.log(error)
            res.status(401).send(error)
        }
    });
    routes.get("/:id", checkToken, async (req, res, next) => {
        const tasksId = Number(req.params.id)
        try {
            let items = await tasksModel.getTasksById(db, tasksId).then((item) => {
                return res.json({ item });
            })
        } catch (error) {
            res.status(401).send(error)
        }
    });
    routes.post("/", checkToken, async (req, res, next) => {
        console.log(req.body)
        if (!req.body.title) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a title' });
        if (!req.body.status) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a status' });
        if (!req.body.body) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a body' });
        if (!req.body.owner) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a owner' });
        const task = {
            title: req.body.title,
            body: req.body.body,
            owner: req.body.owner,
            status: req.body.status
        };
        try {
            await tasksModel.createNewTask(db, task).then((items) => res.status(201).send({ msg: 'Task is made' }));
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    });
    routes.patch("/:id", checkToken, async (req, res, next) => {
        if (!req.body.title) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a title' });
        if (!req.body.status) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a status' });
        if (!req.body.body) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a body' });
        if (!req.body.owner) return res.status(400).send({ msg: 'Form error.', reason: 'You need to provide a owner' });
        const task = {
            title: req.body.title,
            body: req.body.body,
            owner: req.body.owner,
            status: req.body.status
        };
        try {
            await tasksModel.changeTask(db, task).then((items) => res.status(200).send({ msg: "Task's been changed" }));
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    });
    return routes;
}