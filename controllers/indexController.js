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

const getForm = (req, res) => {
    res.render("form");
};

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

const getMessage = (req, res) => {
    const { msgId } = req.params;
    const message = messages.find(mes => mes.id === Number(msgId));

    res.render("message", { message: message});
};

const getIndex = (req, res) => {
    res.render("index", {title: "Mini Message Board", messages: messages});
};

module.exports = { getForm, getIndex, postForm, getMessage };