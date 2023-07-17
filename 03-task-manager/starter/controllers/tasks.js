const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    const tasks = await Task.find({}) // pass an empty object which gets us all the documents in the collection
    res.status(200).json({ tasks }) // or ({tasks: tasks})
    // res.status(200).json({ tasks, amount: tasks.length })
    // res.status(200).json({ success: true, data:{ tasks, nbHits: tasks.length } })
    // res.status(200).json({ status: "success", data:{ tasks, nbHits: tasks.length } })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task }) 
})

const getSingleTask = asyncWrapper(async (req, res, next) => { // 1:56
    const { id:taskID } = req.params // destructure the id and put an alias - taskID
    const task = await Task.findOne({ _id:taskID })
    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id:taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id:taskID }, req.body, {
        new:true, 
        runValidators: true,
    })
    
    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }

    res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
    const { id:taskID } = req.params
    const task = await Task.findOneAndDelete({ _id:taskID })
    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }
    res.status(200).json({ task })
    // res.status(200).send() // also works fine
    // res.status(200).json({ task: null, status: 'success' }) // if no info is needed on the front end when deleting an item
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}