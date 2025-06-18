const { Router } = require("express");
const indexRouter = Router();
let idCount = 3;

const messages = [
    {   
        id: 1,
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        id: 2,
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
        id: idCount,
        user: firstName + " " + lastName,
        text: messageText,
        added: new Date(),
    };

    messages.push(newMessage);
    idCount++;
    res.redirect("/");
});


indexRouter.get("/message/:msgId", (req, res) => {
    const { msgId } = req.params;
    const message = messages.find(mes => mes.id === Number(msgId));

    res.render("message", { message: message});
});

indexRouter.get("/", (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
});

module.exports = indexRouter;