const express = require("express");
const app = express();
const wp = require("./lib/worshipplanning");
//const slack = require('./lib/slack')

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.redirect("/api/events"));

app.get("/api/heartbeat", (req, res) => res.send("Ok"));

app.get("/api/events/", (req, res) =>
  wp.getEvents(req.query.page || 1, function (err, events) {
    if (err) {
      console.log(err);
      res.send("Error: " + err);
    } else {
      res.header("Content-Type", "application/json");
      res.send(JSON.stringify(events, null, 4));
    }
  })
);

app.listen(PORT, () => console.log(`Example app listening on ${PORT}!`));
