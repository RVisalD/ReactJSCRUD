const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const { redirect } = require("react-router-dom");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "reactjscrud",
  password: "sal261102",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/list", (req, res) => {
  const sqlList = "SELECT * FROM users";
  db.query(sqlList, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const title = req.body.title;
  const gender = req.body.gender;
  const sqlInsert = "INSERT INTO users (name,age,title,gender) VALUES(?,?,?,?)";
  db.query(sqlInsert, [name, age, title, gender], (err, result) => {
    res.send("Successful");
  });
});

app.put("/api/update", (req, res) => {
  const name = req.body.name;
  const title = req.body.title;
  const sqlUpdate = "UPDATE users SET title = ? WHERE name = ?";
  db.query(sqlUpdate, [title, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.delete("/api/delete/:name", (req, res) => {
  const name = req.params.name;
  const sqlDelete = "DELETE FROM users WHERE name = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(4000, () => {
  console.log("running on port 3001");
});
