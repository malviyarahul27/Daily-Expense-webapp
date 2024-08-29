const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/auth.middlewares")
const UserSchema = require("../modals/userSchema");

const passport = require('passport');
const locatStrategy = require('passport-local');
passport.use(new locatStrategy(UserSchema.authenticate()));
// passport.use(User.createStrategy()); // crediential other than username like {email or etc}



router.get("/register", (req, res, next)=>{
    res.render("register", {
        title: "Expense Tracker | Register",
        User: req.user
    })
});

router.post("/register", async(req, res, next)=>{
    try {
        const {username, email, password} = req.body;
        await UserSchema.register({username, email}, password);
        // await UserSchema.authenticate(username, password);
        // res.redirect("/user/profile");
        console.log(req.body)
        res.redirect("/user/login")
    } catch (error) {
        console.log(error.message);
        res.send(error.message) 
    }
});

router.get("/login", (req, res, next)=>{
    res.render("login", {title: "Expense Tracker | Login", user: req.user})
    
})
router.post("/login", passport.authenticate("local", {
    successRedirect: "/user/main",
    failureRedirect: "/user/login"
    }),    
    (req,res,next)=>{}
)
router.get("/main", isLoggedIn, async(req, res, next)=>{
    try {
        console.log(req.user)
        res.render("main", {title: "Expense Tracker | Home", user: req.user} )
    } catch (error) {
        res.send(error.message)
    }
});
router.get("/logout", isLoggedIn, async(req, res, next)=>{
    req.logout(()=>{
        res.redirect("/")
    });
});
module.exports = router;
