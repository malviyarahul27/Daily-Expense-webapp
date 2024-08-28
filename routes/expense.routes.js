const express = require("express");
const router = express.Router();

const dailyExpense = require("../modals/DailySchema");


router.get("/dailycreate", (req, res, next)=>{
    res.render("dailycreate", {title: "Expense | Daily Expense"})
});
// post 
router.post("/dailycreate", async (req, res, next)=>{
    try {
        const newDailyEx = new dailyExpense({...req.body});
        await newDailyEx.save()
        // res.send(newDailyEx) for checking
        res.redirect("/expense/dailyshow")
    } catch (error) {
        res.send(error.message)        
    }
});

router.get("/dailyshow", async(req, res, next)=>{
    try {
        const dailyExShow = await dailyExpense.find();
        res.render("dailyshow", {title: "Expense Tracker | Daily Expense Show", dailyExShow: dailyExShow})
        // console.log(dailyExShow) for checking
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
});
router.get("/dailyshowone/:id", async (req,res,next)=>{
    try {
        const expense = await dailyExpense.findById(req.params.id);
        res.render("dailyshowone",{
            title: "Expense Tracker | Expense Details",
            expense: expense
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.message)
    }
});
router.get("/delete/:id", async(req, res, next)=> {
    try {
        await dailyExpense.findByIdAndDelete(req.params.id);
        res.redirect("/expense/dailyshow")
        
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});
router.get("/update/:id", async(req, res, next)=> {
    try {
        const dailyshowupdate = await dailyExpense.findById(req.params.id);
        res.render("dailyupdate",{
            title: "Expense Tracker | Update Daily Expense",
            expense: dailyshowupdate
        });
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
});
router.post("/update/:id", async(req, res, next)=> {
    try {
        const dailyshowupdate = await dailyExpense.findByIdAndUpdate(req.params.id,req.body);
        res.redirect("/expense/dailyshow");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
})



router.get("/delivary/create", (req, res, next)=>{

    res.render("delivarycreate", {title: "Express | Daily Expense" })
});

router.get("/delivary/show", (req, res, next)=>{
    res.render("delivaryshow", {title: "Express | Daily Expense" })
});

module.exports = router;
