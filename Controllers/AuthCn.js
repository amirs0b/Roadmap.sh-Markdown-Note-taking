import User from "../Models/UserMd.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {catchAsync, HandleERROR} from "vanta-api";

export const login = catchAsync(async (req, res, next) => {
    const {username = null, password = null} = req.body;
    if (!username || !password) {
        return next(new HandleERROR("Username and Password are required", 400));
    }
    const user = await User.findOne({username})
    if (!user) {
        return next(new HandleERROR("Invalid username or password", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new HandleERROR("Invalid username or password", 400));
    }
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,);
    res.status(200).json({
        status: "success", data: {
            token, user: {
                id: user._id, username: user.username, email: user.email, role: user.role,
            },
        },
    });
})

export const register = catchAsync(async (req, res, next) => {
    const {username = null, email = null, password = null} = req.body;
    if (!username || !password) {
        return next(new HandleERROR("Username and Password are required", 400));
    }
    const existingUser = await User.findOne({username});
    if (existingUser) {
        return next(new HandleERROR("Username is already taken", 400));
    }
    const passReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    if (!passReg.test(password)) {
        return next(new HandleERROR("Password must be at least 8 characters long and contain at least one letter and one number", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
        username, email, password: hashedPassword,
    });

    res.status(201).json({
        status: "success", message: "User registered successfully"
    })
})