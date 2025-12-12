//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//placeholders for tasks
var task = ["buy a new udemy course", "practise with kubernetes"];
var complete = ["finish reading the book"];

//add task
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

//mark task complete
app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;

    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//DELETE TASK FEATURE (NEW)
app.post("/delete", function (req, res) {
    const item = req.body.item;

    // Delete from pending
    if (task.includes(item)) {
        task.splice(task.indexOf(item), 1);
    }

    // Delete from completed
    if (complete.includes(item)) {
        complete.splice(complete.indexOf(item), 1);
    }

    res.redirect("/");
});

//render tasks
app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});

//server
app.listen(port, function () {
    console.log("server is running on http://localhost:" + port);
});
