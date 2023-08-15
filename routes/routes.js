const express = require('express');
const Model = require('../model/model')
const router = express.Router()
// Let's Write five API Endpoints
// 1. Posting data to Database
// 2. Getting all te data from Database
// 3. Getting data based on the ID
// 4. Updating data based on the ID
// 5. Deleting data based on the ID

// Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//GET all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find()
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updateData, options
        )
        res.json(result)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..)`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router