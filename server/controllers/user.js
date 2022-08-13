import User from "../models/User.js";
import { generateToken } from "../services/auth.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or password");
    }
};

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }


    let user = new User({ name, email, password })
    user = await user.save()

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid Data");
    }
};

// From a list a super user will make a user admin
const makeUserAdmin = async (req, res, next) => {
    console.log(req.params.id)
    let user = await User.findById(req.params.id)
    if (!user.isAdmin && user) {
        user.isAdmin = true;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
}


export { authUser, registerUser, makeUserAdmin }