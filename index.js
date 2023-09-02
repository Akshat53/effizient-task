const express = require("express");
const dotenv = require("dotenv");
const db  = require("./db");
const cors = require("cors");
dotenv.config({ path: "./.env" });


db.connect((err) => {
  err ? console.log(err) : console.log("db connected");
});

const app = express();

app.use(express.json());
app.enable("trust proxy");
app.use(cors());

app.get("/", (req, res) => res.send("Hello"));
app.use("/api", require("./routes"));


app.listen(process.env.PORT || 3000, function () {
  console.log(`server on at port: ${process.env.PORT}`);
});
