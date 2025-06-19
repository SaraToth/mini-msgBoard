const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended:true }));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
})

app.listen(PORT || 3000, () => {
    console.log("App is running");
});