const express = require('express');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
const Assignment = require('../models/assignment');

const router = express.Router();

// to register user
router.post('/register', async (req, res) => {
    var {username, password, role} = req.body;
    console.log("register called", req.body)
    try {
        console.log("username ", username)
        console.log("password ", password)
        console.log("role ", role)
        if (!username || !password || !role) throw new error ('all fields required');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hashedPassword", hashedPassword)
        password = hashedPassword
        const user = new User({username, password, role});
        console.log("user --->", user)
        await user.save();
        res.status(201).json({message : "user registered successfully"});
    }
    catch(error) {
        console.log("error", error)
        res.status(400).json({message : error.message});
    }
})

// to login user
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user) throw new error ('User not found');

        const foundUser = await bcrypt.compare(password, user.password);
        if (!foundUser) throw new error ('Invalid credentials');

        const token = jsonwebtoken.sign({ id: user._id}, 'yoursecretkey', {expiresIn : '30m'});
        res.status(200).json({token, role: user.role});
    }
    catch(error) {
        res.status(400).json({error : error.message});
    }
    
});

// upload assignments 
router.post('/upload', async(req, res) => {
    const {task, adminId} = req.body;
    try {
        const assignmentUpload = new Assignment({userId: req.user._id, task, adminId});
        await assignmentUpload.save();
        res.status(201).json({message : "Assignment uploaded successfully"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

// fetch all admins
router.get('/admins', async(req, res) => {
    try {
        const admins = await User.find({role : 'Admin'}, 'username');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({error : 'failed to fetch all admins'});
    }
});

module.exports = router;

