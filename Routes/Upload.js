import express from "express";
import upload from "../Utils/Upload.js";
import { uploadNote } from "../Controllers/UploadCn.js";
import isLogin from "../Middlewares/IsLogin.js";

const uploadRouter = express.Router();


uploadRouter.route('/').post(isLogin, upload.single("noteFile"), uploadNote);

export default uploadRouter;