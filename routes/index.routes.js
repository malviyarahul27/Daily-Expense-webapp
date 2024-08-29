const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express | expense Tracker', user: req.user });
});

router.get("/about", (req, res, next)=>{
  res.render("about", {title: "Express | expense Tracker", user: req.user });
})

module.exports = router;
