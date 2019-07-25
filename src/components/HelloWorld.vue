<template>
    <div id="container">
        <section class="stage">
            <h1 class="stage__title">Tasks</h1>
            <div v-for="task in tasksPending">
                <div class="card">
                    <h2 class="card__activity">{{task.title}} (id: {{task.id}})</h2>

                    <p class="card__description">{{task.body}}</p>
                    <span>
                         <button @click="editTask(task)" class="btn-sm btn-warning verySmall">Edit</button>
                         <button @click="deleteTask(task.id)" class="btn-sm btn-danger verySmall">Delete</button>
                    </span>
                    <figure class="card__avatar card__avatar--blue">{{task.username}}</figure>
                    <div class="card__date card__date--today">{{task.status | statusDisplay}}</div>
                </div>
            </div>
        </section>

        <section class="stage">
            <div class="card middle">
                <div v-show="task.id" class="form-group">
                    <input type="text" class="form-control" v-model="task.id" placeholder="ID:" disabled/>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="task.title" placeholder="Title"/>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="task.body" placeholder="Body"/>
                </div>
                <div class="form-group">
                    <select class="form-control" v-model="task.owner">
                        <option selected disabled>Select a owner:</option>

                        <option v-for="user in users" :value=user.id>{{user.username}}</option>

                    </select>
                </div>
                <div class="form-group">
                    <select class="form-control" v-model="task.status">
                        <option selected disabled>Select status</option>
                        <option value="1">Done</option>
                        <option value="0">Not finished</option>
                    </select>
                </div>
            </div>
            <button v-if="this.updateable" class="btn btn-large btn-success" @click="updateTask">Update the task</button>
            <button v-else class="btn btn-large btn-success" @click="createTask">Create new Task</button>
            <button class="btn btn-large btn-warning" @click="resetTask()">Reset form</button>
        </section>

        <section class="stage">
            <h1 class="stage__title">Finished Tasks <button @click="finishVisible=!finishVisible" class="btn btn-sm btn-info">Show finished</button></h1>

            <div v-if="finishVisible" v-for="task in tasksFinished">
                <div class="card">
                    <h2 class="card__activity">{{task.title}} (id: {{task.id}})</h2>
                    <p class="card__description">{{task.body}}</p>
                    <figure class="card__avatar card__avatar--blue">{{task.username}}</figure>
                    <div class="card__date card__date--today">{{task.status | statusDisplay}}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "HelloWorld",
        data() {
            return {
                finishVisible:false,
                task: {},
                users: [],
                tasksPending: [],
                tasksFinished: [],
                updateable:false,
            };
        },
        props: {
            msg: String
        },
        methods: {
            getAllTasks() {
                axios({url: "http://localhost:3000/apiv1/tasks", method: "GET"}).then(
                    resp => {
                        this.tasksFinished = [];
                        this.tasksPending = [];
                        resp.data.items.forEach(item => {
                            if (item.status == 1) this.tasksFinished.push(item);
                            if (item.status == 0) this.tasksPending.push(item);
                        });
                    }
                );
            },
            getAllUsers() {
                axios({url: "http://localhost:3000/apiv1/users", method: "GET"}).then(
                    resp => {
                        this.users = resp.data.item;
                    }
                );
            },
            resetTask() {
                this.task = {id: 0, title: "", body: "", owner: "", status: "0"};
            },
            createTask() {
                axios({url: "http://localhost:3000/apiv1/tasks", data: this.task, method: "POST"}).then(
                    resp => {
                        this.getAllTasks();
                        this.resetTask();
                    }
                );
            },
            updateTask() {
                axios({url: "http://localhost:3000/apiv1/tasks/"+this.task.id, data: this.task, method: "PATCH"}).then(
                    resp => {
                        this.getAllTasks();
                        this.resetTask();
                    }
                );
            },
            editTask(task) {
                this.updateable=true;
                this.task = task;
            },
            deleteTask(taskId){
                axios({url: "http://localhost:3000/apiv1/tasks/"+taskId, method: "DELETE"}).then(
                    resp => {
                        this.getAllTasks();
                        this.resetTask();
                    }
                );
            }
        },
        mounted() {
            localStorage.getItem("token");
            this.getAllTasks();
            this.getAllUsers();
        },
        filters: {
            statusDisplay: function (value) {
                return value == 1 ? "Done" : "Pending...";
            }
        }
    };
</script>


<style scoped>
    .verySmall{
        width:70px;
    }
    /* page container and grid */
    #container {
        display: grid;
        grid-template-columns: 380px 380px 380px;
        grid-template-rows: auto;
        grid-column-gap: 32px;
        width: 1204px;
        margin: 3% auto;
    }

    /* board card style */
    .stage__title {
        font-size: 24px;
        letter-spacing: 0.3px;
        color: #272a43;
        margin-bottom: 32px;
    }

    .card {
        width: 380px;
        height: 192px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 3px 9px -8px rgba(0, 0, 0, 0.23);
        padding: 24px;
        margin-bottom: 24px;
        border: 1px solid gray;
    }

    .middle {
        height: 400px;
    }

    .card__activity {
        font-size: 1rem;
        font-weight: 700;
        color: #646678;
        margin-bottom: 16px;
    }

    .card__description {
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #b4bbc8;
        margin-bottom: 28px;
    }

    .card__avatar {
        display: inline-block;

        width: 60px;
        height: 100%;
        border-radius: 20%;
        font-size: 15px;
        font-weight: 400;
        justify-items: center;
        line-height: 40px;
        color: #fff;
    }

    .card__avatar--blue {
        background-color: #3591fb;
    }

    .card__avatar--purple {
        background-color: #c335fb;
    }

    .card__avatar--light {
        background-color: #35cdfb;
    }

    .card__date {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        float: right;
        position: relative;
    }

    .card__date--past {
        color: #b4bbc8;
        font-weight: 400;
    }

    .card__date--late {
        color: #ef2c40;
    }

    .card__date--today {
        color: #915aff;
    }

    .card__date--soon {
        color: #4dd86e;
    }
</style>
