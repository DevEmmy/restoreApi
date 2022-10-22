const router = require('express').Router();
const User =require('../Models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin.js');
const jwt_secret = process.env.JWT_SECRET

router.get("/", async (req, res)=>{
    await User.find()
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})

router.post("/addAvatar", requireLogin, async (req, res)=>{
    const userId = req.user._id;
    await User.findById(userId)
    .then(resp =>{
        resp.avatar = req.body;
        User.findByIdAndUpdate(userId, resp, {new: true})
        .then(resp => res.json(resp))
        .catch(err => res.json(err))
    })
    .catch(err => res.status(403).json({error: "User not found"}))
})

router.post('/signup',async (req, res)=>{
    const {email, password} = req.body;
    await bcrypt.hash(password, 8)
    .then(hashedpassword => {
        const newUser = new User({email, password: hashedpassword})
        newUser.save()
        .then((resp)=>{
            bcrypt.compare(password, resp.password)
            .then(doMatch=>{
                if(doMatch){
                    const token = jwt.sign({_id: resp._id}, jwt_secret)
                    res.json({token: token, user: resp})
                }
                else{
                    res.json({error: "Wrong Password"})
                }
            })
        })
        .catch(err=>res.json(err)) 
    })
   .catch(err => res.json(err))
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
                    res.json({token: token, user: user})
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
    await User.findById(user)
    .then(user => {
        const {firstName, lastName, matricNumber, level, telephone, college, department, avatar} = req.body
        user.fullName = fullName
        user.lastName = lastName
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
    .catch(err => res.status(400).json(err))
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
