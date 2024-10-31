const { Router } = require("express");

const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/sign', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter
}