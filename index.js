const express = require("express");
const db = require("./DBconnection");
const cors=require("cors")
const route=require("./route")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use("/",route)

app.listen(3500, () => {
  console.log("Server Created");
});