const { Router } = require("express");
const indexRouter = Router();

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World",
        user: "Charles",
        added: new Date(),
    },
];

indexRouter.get("/new", (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
})

indexRouter.get("/", (req, res) => {
    res.send("Home");
});

module.exports = indexRouter;