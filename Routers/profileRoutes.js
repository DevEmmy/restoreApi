const router = require('express').Router();
const User =require('../Models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin.js');
const Profile = require('../Models/profile.models.js');

router.post("/update-profile", requireLogin, (req, res)=>{
    const profile = req.body;
    profile.user = req.user
    new Profile(profile).save()
    .then(resp => res.json({message: "Successful"}))
    .catch(err => res.json({message: "An Error Occured"}))
})

module.exports = router