module.exports = {
    getAllTasks(db) {
        // const sql = "select a.id,a.title,a.body,a.owner,a.status,b.username from tasks a left join users b where a.id=b.id";
        const sql = "select * from tasks left join users on tasks.owner=users.id";
        const params = [];
        return db.all(sql, params);
    },
    getTaskById(db, taskId) {
        const sql = "select * from tasks where id = ?"
        let params = [taskId]
        return db.get(sql, params);
    },
    createNewTask(db, task) {
        const sql = "INSERT INTO tasks (title,body,status,owner) VALUES (?,?,?,?);"
        let params = [task.title, task.body, task.status, task.owner];
        return db.run(sql, params);
    },
    editTaskById(db, task) {
        const sql = `UPDATE tasks 
                    SET
                        title='${task.name}',
                        body='${task.body}',
                        status='${task.status}',
                        owner='${task.owner}'
                    where
                        id=${task.id}`;
        return db.run(sql, []);
    },
    deleteTaskById(db, taskId) {
        const sql = `DELETE from tasks
                     WHERE id=${taskId}`;
        return db.run(sql, []);
    },
}