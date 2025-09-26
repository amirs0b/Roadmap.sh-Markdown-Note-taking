import User from "../Models/UserMd.js";
import ApiFeatures, {catchAsync, HandleERROR} from "vanta-api";

export const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User, req?.query, req?.role)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate();

    const result = await features.execute();
    return res.status(200).json(result);
})

export const getOneUser = catchAsync(async (req, res, next) => {
    const userId = req?.params?.id;
    const features = new ApiFeatures(User, req?.query, req?.role)
        .addManualFilters(req.role === "admin" ? {} : {_id: userId})
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .populate();

    const result = await features.execute();
    return res.status(200).json(result);

})

export const updateUser = catchAsync(async (req, res, next) => {
    if (req.role === "admin" && req.userId !== req.params.id) {
        return next(new HandleERROR("You are not authorized to update this user", 403));
    }
    const user = await User.findByIdAndUpdate(req.params.id)
    user.username = req?.user?.username || user.username;
    user.email = req?.user?.email || user.email;
    user.role = req?.user?.role && req.role === "admin" ? req.body.role : user?.role;
    const newUser = await user.save();
    return res.status(200).json({
        status: "success", data: newUser
    });


})