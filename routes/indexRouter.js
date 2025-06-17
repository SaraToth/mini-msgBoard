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
    res.render("form");
})

indexRouter.post("/new", (req, res) => {
    const { firstName, lastName, messageText } = req.body;

    const newMessage = {
        user: firstName + " " + lastName,
        text: messageText,
        added: new Date(),
    };

    messages.push(newMessage);

    res.redirect("/");
});

indexRouter.get("/", (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
});

module.exports = indexRouter;