const db = require("../db/queries");
let idCount = 3;

// const messages = [
//     {   
//         id: 1,
//         text: "Hi there!",
//         user: "Amando",
//         added: new Date(),
//     },
//     {
//         id: 2,
//         text: "Hello World",
//         user: "Charles",
//         added: new Date(),
//     },
// ];

//Render form view
const getForm = (req, res) => {
    res.render("form");
};

//Submit form on post
const postForm = (req, res) => {
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
};

// Get message view
const getMessage = (req, res) => {
    const { msgId } = req.params;
    const message = messages.find(mes => mes.id === Number(msgId));

    res.render("message", { message: message});
};

// Get's the index view (Home page)
const getIndex = async (req, res) => {
    const messages = await db.getAllMessages();

    res.render("index", {title: "Mini Message Board", messages: messages});
};

module.exports = { getForm, getIndex, postForm, getMessage };