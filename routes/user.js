const { Router } = require("express");

const userRouter = Router();

userRouter.post('/signup', (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

userRouter.post('/singin', (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})

userRouter.get('/purchases', (req, res) => {
    res.json({
        message: "Signup endpoint"
    })
})


module.exports = {
    userRouter
}

