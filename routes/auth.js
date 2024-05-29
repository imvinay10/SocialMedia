const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/user')
router.get('/',(res,req) => {
    res.status(200).send('Auth route');
});

//take email, name, mobile, password
//check whether user already exist in db or not.
//hash password using bcrypt
//save user details to DB
router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/all',(req,res) => {
    return res.send(all);
});

module.exports = router; 