const router = require('express').Router();
const User =require('../Models/user.models.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt');
const requireLogin = require('../middlewares/requireLogin.js');
const Document = require('../Models/document.models.js');

router.get("/all", async (req, res)=>{
    Document.find()
    .then(resp => res.json(resp))
    .catch(err=> res.json(err))
})

router.post("/", requireLogin, async (req, res)=>{
    const document = req.body
    document.user = req.user
    new Document(document).save()
    .then(resp => res.json({message: "Uploaded successfully"}))
    .catch(err => res.json({message: "An error occured"}))
})

router.get("/", requireLogin, async (req, res)=>{
    const user = req.user._id
    Document.find({user: user})
    .then(resp => res.json(resp))
    .catch(err => res.json(err))
})

router.delete("/:id", requireLogin, async (req, res)=>{
    const user = req.user._id
    const {id} = req.params
    Document.findByIdAndDelete(id)
    .then(resp => res.json({message: "Deleted Successfully"}))
    .catch(err => res.json(err))
})

module.exports = router