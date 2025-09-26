import express from "express";
import {createNote, deleteNote, getAllNotes, getOneNote, renderNoteAsHtml, updateNote} from "../Controllers/NoteCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const noteRouter = express.Router();
noteRouter.route("/:id/render").get(isLogin, renderNoteAsHtml);
noteRouter.route("/").post(isLogin, createNote).get(isLogin, getAllNotes);
noteRouter.route("/:id")
    .get(isLogin, getOneNote).patch(isLogin, updateNote).delete(isLogin, deleteNote)


export default noteRouter;