const express = require('express');
const Assignment = require('../models/assignment');

const router = express.Router();

//view all assignments
router.get('/assignments', async(req, res) => {
    try {
        const assignments = await Assignment.find({adminId : req.user._Id})
        .populate('userId', 'username')
        .sort({createdAt : -1});
        res.status(200).json(assignments);
    }
    catch (error) {
        res.status(500).json({error : 'failed to fetch assignments'});
    }
})

// accept assignments
router.post('/assignments/:id/accept', async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            req.params.id,
            {status : Accepted},
            {new : true}
        );
        if (!assignment) throw new Error('Assignment not found');
        res.status(200).json({message : "Assignment uploaded", assignment});
    } catch(error) {
        res.status(400).json({error : error.message});
    }
})

// reject assignments
router.post('/assignments/:id/reject', async(req, res) => {
    try {
        const assignment = await user.findByIdAndUpdate (
            req.params.id,
            {status : Rejected},
            {new : true},
        );
        if (!assignment) throw new error ('Assignment not found');
        res.status(200).json({message : "Assignment rejected", assignment});
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
})

module.exports = router;