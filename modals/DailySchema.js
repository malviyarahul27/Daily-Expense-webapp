const mongoose = require("mongoose");

const DailySchema = new mongoose.Schema(
    {
        title: {
            type: String,

        },
        amount: {
            type: Number,
            required: [true, "Amount is required"]
        },
        paymentMode: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            trim: true,
            required: [true, "Category is Required"],
            minLength: [3, "Category must be atleast 3 characters long"],
            maxLength: [50, "Category must not exceed more than 50 characters"],
            lowercase: true,        
        },
        remark: {
            type: String,
            trim: true,
            required: [true, "Remark is required"],
            lowercase: true
        }
    },
    {timestamps: true},
);

const dailyExpense = mongoose.model("dailyExpense", DailySchema);

module.exports = dailyExpense