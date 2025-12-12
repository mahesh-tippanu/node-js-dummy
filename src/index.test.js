const app = require("express")();
const supertest = require("supertest");
const request = supertest(app);


app.get("/", function (req, res) {
    res.status(200).send("practise with kubernetes");
});


describe("GET /", function () {
    it("should return 200 OK", function (done) {
        request
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});

app.post("/delete", function (req, res) {
    const item = req.body.item;

    // Delete from pending tasks
    if (task.includes(item)) {
        task.splice(task.indexOf(item), 1);
    }

    // Delete from completed tasks
    if (complete.includes(item)) {
        complete.splice(complete.indexOf(item), 1);
    }

    res.redirect("/");
});
    console.log("Server started on port " + port);