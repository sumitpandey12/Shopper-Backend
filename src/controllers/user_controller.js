const UserModel = require("../models/user_model");
const bcrypt = require('bcrypt');

const UserController = {

    createAccount: async function (req, res) {
        try {

            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();

            return res.json({ success: true, message: "User created!", data: newUser });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },


    signIn: async function (req, res) {
        try {

            const { email, password } = req.body;

            const foundUser = await UserModel.findOne({ email: email });
            if (!foundUser) {
                return res.json({ success: false, message: "User not found!" });
            }

            const passwordMatched = bcrypt.compareSync(password, foundUser.password);

            if (!passwordMatched) {
                return res.json({ success: false, message: "Password not matched!" });
            }

            return res.json({ success: true, message: "Login Successfully!", data: foundUser });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    }
    

};

module.exports = UserController;