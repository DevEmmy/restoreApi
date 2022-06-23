const router = require('express').Router();
const User =require('../Models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin.js');


router.post('/signup',async (req, res)=>{
    const {email, password} = req.body;
    await bcrypt.hash(password, 8)
    .then(hashedpassword => {
        const newUser = new User({email, password: hashedpassword})
        newUser.save()
        .then((resp)=>{
            res.json({user:resp})
        })
        .catch(err=>res.status(400).json({error:"An error occured"})) 
    })
   
})

router.post('/signin', async (req, res)=>{
    const {email, password} = req.body;
    await User.findOne({email})
    .then(user=>{
        if(!user){
            res.json({error: "There's no user with this email"})
        }
        else{
            bcrypt.compare(password, user.password)
            .then(doMatch=>{
                if(doMatch){
                    
                    const token = jwt.sign({_id: user._id}, jwt_secret)
                    res.json({token: token})
                }
                else{
                    res.json({error: "Wrong Password"})
                }
            })
        }
    })
})


module.exports = router