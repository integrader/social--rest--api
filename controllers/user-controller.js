import user from "../model/user.js"
import bcrypt from 'bcryptjs'
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await user.find()

    } catch (err) {
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({
            messaage: "user not found"
        })
    }
    return res.status(200).json({
        users
    })

}

export const signup = async (req, res, next) => {
    const {
        name,
        email,
        password

    } = req.body

    let eistedUser;
    try {
        eistedUser = await user.findOne({
            email
        })
    } catch (err) {
        console.log(err)
    }
    if (eistedUser) {
        return res.status(404).json({
            message: "user already existed"
        })
    }
    const hashPassword = bcrypt.hashSync(password);
    const User = new user({
        name,
        email,
        password: hashPassword,
        blogs: []
    })
    try {
        await User.save();
    } catch (err) {
        console.log(err)
    }

    return res.status(201).json({
        User
    })
}

export const signIn = async (req, res, next) => {
    const {
        email,
        password
    } = req.body

    let eistedUser;
    try {
        eistedUser = await user.findOne({
            email
        })
    } catch (err) {
        console.log(err)
    }
    if (!eistedUser) {
        return res.status(404).json({
            message: "user doesn't existed"
        })
    }
    const isPass = bcrypt.compareSync(password, eistedUser.password)
    if (!isPass) {
        return res.status(308).json({
            message: "Password is incorrect"
        })
    }
    return res.status(200).json({
        message: "login successfully"
    })

}