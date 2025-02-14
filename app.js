const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(3000, () => {
    console.log("Listening at port: 3000");
});
