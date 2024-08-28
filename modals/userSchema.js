const mongoose = require("mongoose")

const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: [true, "username is required"],
        minlength: [2, "length must atleast 5 characters long"],
        maxlength: [15, "Username must not exceed more than 15 characters"],
        trim: true,
    },
    email:{
        type: String,
        unique: true,
        required: [true, "username is required"],
        lowercase: true,
        trim: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid Email Format"],

    },
    passport:String,
    image:{
        type: String,
        default: "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
    },
});

userSchema.plugin(plm);
// userSchema.plugin(plm, { usernameField: "email" }); // for email as username // createStrategy

const UserSchema = mongoose.model("UserSchema", userSchema);

module.exports = UserSchema;

