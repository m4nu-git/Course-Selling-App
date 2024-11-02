const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;  // TODO: adding zod validation
    // TODO: hash the password so plaintext password is not stored in the DB

    // TODO: Put inside a try catch block

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })

    res.json({
        message: "Signup succeeded!"
    })
})

userRouter.post('/singin', async (req, res) => {
    const { email, password } = req.body;

    // TODO : ideally password should br hashed, and hence you can't compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
        password: password
    }); // []

    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

userRouter.get('/purchases', async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i < purchases.length; i++) {
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const courseData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        courseData
    })
})


module.exports = {
    userRouter
}

