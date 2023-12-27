const Validator = require('validatorjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config')
const User = require('../model/user.model');
const UserSession = require('../model/userSession.model');


const signUp = async (req, res) => {
    let validation = new Validator(req.body, {
        userName: 'required|string',
        email: 'required|email',
        password: 'required|min:5|max:10'
    });
    if (validation.fails()) {
        const error = validation.errors.all();
        return res.json({ error })
    }

    try {
        const { userName, email, password } = req.body;

        const isExist = await User.findOne({ email: email });

        if (isExist) {
            return res.send("Email already register.")
        }

        const userData = await User.create({ userName, email, password })
        return res.status(201).json({ data: userData, message: "register successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error")
    }
}


const login = async (req, res) => {
    let validation = new Validator(req.query, {
        email: 'required',
        password: 'required'
    });
    if (validation.fails()) {
        const error = validation.errors.all();
        return res.json({ error })
    }
    try {
        const { email, password } = req.query;

        const isExist = await User.findOne({ email: email });
        if (!isExist) {
            return res.send("user not found.")
        }

        const comparePassword = bcrypt.compareSync(password, isExist.password);
        if (!comparePassword) {
            return res.send("password not match")
        }

        const token = await jwt.sign({ email: email, }, config.jwt_secret_key);

        const userData = await UserSession.create({ user_id: isExist._id, token: token })
        return res.json({ data: userData, message: "Login successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}


const getProfile = async (req, res) => {
    let validation = new Validator(req.query, {
        id: 'required'
    });
    if (validation.fails()) {
        const error = validation.errors.all();
        return res.json({ error })
    }
    try {
        const { id } = req.query;
        const authUser = req.user;
        const isExist = await User.find({ _id: authUser.user_id, deleted_At: null }, '-password');

        if (!isExist.length) {
            return res.send("user not found.")
        }

        return res.json({ data: isExist, message: "get profile successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}


const getAllUser = async (req, res) => {
    try {
        const isExist = await User.find()
        if (!isExist) {
            return res.send("user not found.")
        }
        return res.json({ data: isExist, message: "get profile successfully." })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}


const updateProfile = async (req, res) => {
    let validation = new Validator(req.query, {
        id: 'required',
        userName: 'required',
        old_password: 'required',
        new_password: 'required'
    });
    if (validation.fails()) {
        const error = validation.errors.all();
        return res.json({ error })
    }
    try {
        const { id, userName, old_password, new_password } = req.query;
        let object = { userName }

        const findData = await User.findOne({ _id: id });
        if (!findData) {
            return res.send("user not found.")
        }

        if (new_password) {
            const isPasswordMatch = bcrypt.compareSync(old_password, findData.password);
            if (!isPasswordMatch) {
                return res.send("password not match")
            }
            object.new_password = new_password;
        }

        const updateData = await User.findByIdAndUpdate({ _id: id }, object)
        return res.json({ data: updateData, message: "update profile successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}


const logout = async (req, res) => {
    try {
        const authUser = req.user;
        const findData = await UserSession.deleteOne({ _id: authUser.user_id });

        return res.json({ data: findData, message: "logout successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error")
    }
}
module.exports = {
    signUp,
    login,
    getProfile,
    getAllUser,
    updateProfile,
    logout
}