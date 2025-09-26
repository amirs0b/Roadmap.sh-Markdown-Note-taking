import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";
import Note from "../Models/NoteMd.js";
import User from "../Models/UserMd.js";

export const createNote = catchAsync(async (req, res, next) => {
    const {title, content, tags} = req.body
    const userId = req.userId

    if (!title || !content) {
        return next(new HandleERROR("Title and content are required", 400))
    }
    const newNote = await Note.create({
        title,
        content,
        tags,
        user: userId
    })
    return res.status(201).json({
        success: true,
        data: {
            note: newNote
        }
    })
})


export const getAllNotes = catchAsync(async (req, res, next) => {
    const userId = req.userId;
    const userRole = req.role;

    const manualFilters = userRole === 'admin'
        ? {}
        : {user: userId};

    const features = new ApiFeatures(Note, req.query, userRole)
        .addManualFilters(manualFilters)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate();

    const result = await features.execute();
    return res.status(200).json(result);
});

export const getOneNote = catchAsync(async (req, res, next) => {
    const userId = req.userId;
    const noteId = req?.params?.id;
    if (!noteId) {
        return next(new HandleERROR("Note Id is required", 400))
    }
    const note = await Note.findById(noteId);
    if (!note) {
        return next(new HandleERROR("No note found with that ID", 404));
    }
    if (req.role !== 'admin' && note.user.toString() !== userId) {
        return next(new HandleERROR("You do not have permission to view this note", 403));
    }
    const features = new ApiFeatures(Note, req?.query, req?.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate();

    const result = await features.execute();
    return res.status(200).json(result);

})


export const updateNote = catchAsync(async (req, res, next) => {
    const noteId = req.params.id;
    const userId = req.userId;

    const note = await Note.findById(noteId);

    if (!note) {
        return next(new HandleERROR("No note found with that ID", 404));
    }

    if (req.role !== 'admin' && note.user.toString() !== userId) {
        return next(new HandleERROR("You do not have permission to edit this note", 403));
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.tags = req.body.tags || note.tags;

    const updatedNote = await note.save();

    res.status(200).json({
        status: "success",
        data: {
            note: updatedNote
        }
    });
});

export const deleteNote = catchAsync(async (req, res, next) => {
    const noteId = req.params.id;
    const userId = req.userId;
    const userRole = req.role;

    const note = await Note.findById(noteId);
    if (!note) {
        return next(new HandleERROR("No note found with that ID", 404));
    }

    if (userRole !== 'admin' && note.user.toString() !== userId) {
        return next(new HandleERROR("You do not have permission to delete this note", 403));
    }
    await Note.findByIdAndDelete(noteId);
    res.status(204).json({
        status: "success",
        data: null
    });
});