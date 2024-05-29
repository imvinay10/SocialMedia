const user = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { error } = require("console");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).send("Please Fill all details");
    }

    const isUserExist =
      (await User.findOne({ email })) && (await User.findOne({ mobile }));
    if (isUserExist) {
      return res.status(400).send("User Already Exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("user registered successfully");
  } catch {
    next(res);
  }

};

const loginUser = async (req, res, next) => {
  try{
      const { email, password} = req.body;

    if( !email || !password){
      return res.status(400).send("please fil all details");
    }

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).send("user not found");
    }

    isPasswordValid = await bcrypt.compare(password, user.password);

    if(! isPasswordValid){
      return res.status(400).send("Invalid Username or Password!");
    }


    const token = jwt.sign({userId : user._id},"secret",{
      expiresIn: "240h",
    })

    res.status(200).json({token, userId: user._id, name:user.name, email:user.email, mobile:user.mobile});
  }
  catch(err){
    next(err);
    // return res.send("error").status(400);
  }
};


module.exports = {registerUser, loginUser};