const db = require("../db/queries");

//Render form view
const getForm = (req, res) => {
    res.render("form");
};

//Submit form on post
const postForm = async (req, res) => {
    const { firstName, lastName, messageText } = req.body;

    const name = firstName + " " + lastName;
    const date = new Date();
    await db.createNewMessage(messageText, name, date);
    res.redirect("/");
};

// Get message view
const getMessage = async (req, res) => {
    const { msgId } = req.params;
    const message = await db.getMessage(Number(msgId));
    res.render("message", { message: message});
};

// Get's the index view (Home page)
const getIndex = async (req, res) => {
    const messages = await db.getAllMessages();

    res.render("index", {title: "Mini Message Board", messages: messages});
};

module.exports = { getForm, getIndex, postForm, getMessage };