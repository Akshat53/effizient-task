const express = require("express");
const dotenv = require("dotenv");
const db  = require("./db");
const cors = require("cors");
const path = require("path");
dotenv.config({ path: "./.env" });


// db.connect((err) => {
//   err ? console.log(err) : console.log("db connected");
// });

const app = express();
const publicDirectory = path.join(__dirname, './assets');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.enable("trust proxy");
app.use(cors());

app.set('view engine', 'hbs');

app.use('/', require('./routes/view'));
app.use("/api", require("./routes"));


app.listen(process.env.PORT || 3000, function () {
  console.log(`server on at port: ${process.env.PORT}`);
});
