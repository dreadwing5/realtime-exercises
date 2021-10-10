import express from "express";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// feel free to take out, this just seeds the server with at least one message
msg.push({
  user: "Sachin",
  text: "Hello, there!",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  res.status(200).json({
    msg: getMsgs(),
  })
});

app.post("/poll", function (req, res) {

  const {
    user,
    text
  } = req.body;
  console.log(user, text);

  msg.push({
    user,
    text,
    time: Date.now()
  })

  res.status(200).json("ok");


});

// start the server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`listening on http://localhost:${port}`);
