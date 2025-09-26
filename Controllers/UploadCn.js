import { catchAsync, HandleERROR } from "vanta-api";
import Note from "../Models/NoteMd.js";
import fs from "fs";
export const uploadNote = catchAsync(async (req, res, next) => {
    if (!req.file) {
        return next(new HandleERROR("Please upload a file", 400));
    }

    const content = fs.readFileSync(req.file.path, 'utf-8');
    fs.unlinkSync(req.file.path);
    const title = req.file.originalname.replace(/\.md$/, '');
    const newNote = await Note.create({
        title,
        content,
        user: req.userId
    });

    res.status(201).json({
        status: "success",
        data: {
            note: newNote
        }
    });
});