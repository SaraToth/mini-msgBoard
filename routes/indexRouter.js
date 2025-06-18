const { Router } = require("express");
const indexRouter = Router();
const { getForm, getIndex, postForm, getMessage } = require("../controllers/indexController");

indexRouter.get("/new", getForm);

indexRouter.post("/new", postForm);


indexRouter.get("/message/:msgId", getMessage);

indexRouter.get("/", getIndex);

module.exports = indexRouter;