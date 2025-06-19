const pool = require("./pool");

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages");
    return rows;
}

async function createNewMessage(message, name, date) {
    await pool.query("INSERT INTO messages (message, name, date) VALUES ($1, $2, $3)", 
        [message, name, date]
    );
};

async function getMessage(msgId) {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [msgId]);
    return rows[0];
}

module.exports = { getAllMessages, createNewMessage, getMessage };