const { Router } = require("express");

const courseRouter = Router();


courseRouter.get('/purchase', (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

courseRouter.get('/preview', (req, res) => {
    res.json({
        message: "Get all the Courses"
    })
})

module.exports = {
    courseRouter
}