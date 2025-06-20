const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters";
const nameLengthErr = "must be between 1 and 35 characters";
const emptyErr = "cannot be empty"

const validateNewMessage = [
    body("firstName").trim()
        .notEmpty().withMessage(`First name ${emptyErr}`)
        .isAlpha().withMessage(`First name ${alphaErr}`)
        .isLength({ min: 1, max: 35}).withMessage(`First name ${nameLengthErr}`),

    body("lastName").trim()
        .notEmpty().withMessage(`Last name ${emptyErr}`)
        .isAlpha().withMessage(`Last name ${alphaErr}`)
        .isLength({ min: 1, max: 35}).withMessage(`Last name ${nameLengthErr}`),

    body("messageText").trim()
        .notEmpty().withMessage(`Message ${emptyErr}`)
        .isLength({ min: 1, max: 300 }).withMessage(`Message must be between 1 and 300 characters`)
];

//Render form view
const getForm = (req, res) => {
    res.render("form");
};

//Submit form on post
const postForm = [
    validateNewMessage,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("form", { errors: errors.array()});
        }

        const { firstName, lastName, messageText } = req.body;
        const name = firstName + " " + lastName;
        const date = new Date();
        await db.createNewMessage(messageText, name, date);
        res.redirect("/");
    },
];

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