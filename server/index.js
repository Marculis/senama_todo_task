const { ObjectId } = require("mongodb");

module.exports = function (app, db) {
  app.post("/todos", (req, res) => {
    const todo = {
      title: req.body.title,
      description: req.body.body,
      complete: false,
    };
    db.collection("todo").insert(todo, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(result);
      }
    });
  });

  app.get("/todos", (req, res) => {
    db.collection("todo")
      .find()
      .toArray((err, list) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(list);
        }
      });
  });

  app.get("/todos/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: ObjectId(id) };
    db.collection("todo").findOne(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.delete("/todos/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: ObjectId(id) };
    db.collection("todo").remove(details, (err, item) => {
      if (err) {
        res.send({ error: "An error has occurred" });
      } else {
        res.send(item);
      }
    });
  });

  app.put("/todos/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: ObjectId(id) };
    db.collection("todo").updateOne(
      details,
      { $set: { title: req.body.title, description: req.body.body } },
      (err, item) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(item);
        }
      }
    );
  });

  app.put("/todos/complete/:id", (req, res) => {
    const id = req.params.id;
    const details = { _id: ObjectId(id) };
    db.collection("todo").updateOne(
      details,
      { $set: { complete: req.body.complete } },
      (err, item) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(item);
        }
      }
    );
  });
};
