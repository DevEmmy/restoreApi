const router = require('express').Router();
const User =require('../Models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin.js');
const Profile = require('../Models/profile.models.js');
const Document = require('../Models/document.models.js');

router.post("/upload", requireLogin, (req, res)=>{
    const document = req.body
    document.user = req.user
    new Document.save(document).save()
    .then(resp => res.json({message: "Uploaded successfully"}))
    .catch(err => res.json({message: "An error occured"}))
})

module.exports = router