import httpStatus from "http-status";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const login = async (req, res) => {


    const { username, password } = req.body;


    if (!username || !password) {
        res.status(400).json({ message: "Please Input All Fields!" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Not Found!" })
        }

        if (bcrypt.compare(password, user.password)) {
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token: token });
        }
    } catch (e) {
        return res.status(500).json({ message: `Something Wrong : ${e}` })
    }
}

const register = async (req, res) => {

    try {
        const { name, username, password } = req.body;

        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(httpStatus.FOUND).json({ message: "User Already Exists!" });
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashPass,
        })

        await newUser.save()

        res.status(httpStatus.CREATED).json({ message: "User Created!" })

    } catch (e) {
        res.status(httpStatus.NOT_FOUND).json({ message: `Something Went Wrong! ${e}` });
    }

}

export { login, register };