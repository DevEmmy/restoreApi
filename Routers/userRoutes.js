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

router.post('/signupAsAdmin',async (req, res)=>{
    const {email, password} = req.body;
    await bcrypt.hash(password, 8)
    .then(hashedpassword => {
        const newUser = new User({email, password: hashedpassword, admin: true})
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

router.put("/update-profile", requireLogin, async (req, res)=>{
    const user = req.user._id;
    User.findById(user)
    .then(user => {
        const {fullName, matricNumber, level, telephone, college, department, avatar} = req.body
        user.fullName = fullName
        user.matricNumber = matricNumber
        user.level = level
        user.telephone = telephone
        user.college = college
        user.department = department
        user.avatar = avatar

        User.findByIdAndUpdate(id, user, {new: true})
        .then(resp => res.json('Successful'))
        .catch(err => res.json("An error occured"))
    })
    .catch(err => res.status(403).json("An error occured"))
})

router.get('/user', requireLogin, async (req, res)=>{
    const user = req.user._id
    User.findById(user)
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})

router.get('/all-users', async (req, res)=>{
    User.find()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})




module.exports = router