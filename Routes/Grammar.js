import express from "express";
import { checkGrammar } from "../Controllers/GrammarCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const grammarRouter = express.Router();

grammarRouter.route("/check").post(isLogin, checkGrammar);

export default grammarRouter;