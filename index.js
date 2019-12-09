var express = require('express');
var app = express();

// Serving static files from "public" folder
app.use(express.static('public'));

/**
 * @api {get} /tasks List all tasks
 * @apiGroup Tasks
 * @apiSuccess {Object[]} tasks Task's list
 * @apiSuccess {Number} tasks.id Task id
 * @apiSuccess {String} tasks.title Task title
 * @apiSuccess {Boolean} tasks.done Task is done?
 * @apiSuccess {Date} tasks.updated_at Update's date
 * @apiSuccess {Date} tasks.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/tasks', function(req, res) {
    // business logic for listing all tasks...
});

/**
 * @api {get} /tasksv2/?query_id=12&url_id=12
 * @apiGroup Tasks
 * @apiParam {int} url_id     URL ID.
 * @apiParam {int} query_id   Query ID.
 * @apiParam {int} id         Body ID.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/tasksv2', function(req, res) {
    // business logic for listing all tasks...
});

/**
 * @api {get} /tasks/:id Find a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} title Task title
 * @apiSuccess {Boolean} done Task is done?
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "done": false
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
app.get('/tasks/:id', function(req, res) {
    // business logic for finding a task...
});

/**
 * @api {post} /tasks Register a new task
 * @apiGroup Tasks
 * @apiParam {String} title Task title
 * @apiParamExample {json} Input
 *    {
 *      "title": "Study"
 *    }
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} title Task title
 * @apiSuccess {Boolean} done=false Task is done?
 * @apiSuccess {Date} updated_at Update date
 * @apiSuccess {Date} created_at Register date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "Study",
 *      "done": false,
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
app.post('/tasks', function(req, res) {
    // business logic for creating a task...
});

/**
 * @api {put} /tasks/:id Update a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiParam {String} title Task title
 * @apiParam {Boolean} done Task is done?
 * @apiParamExample {json} Input
 *    {
 *      "title": "Work",
 *      "done": true
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
app.put('/tasks/:id', function(req, res) {
    // business logic for update a task
});

/**
 * @api {delete} /tasks/:id Remove a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
app.delete('/tasks/:id', function(req, res) {
    // business logic for deleting a task
});

app.listen(3000, function() {
    console.log('Task api up and running...');
});