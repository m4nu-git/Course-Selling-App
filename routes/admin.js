const { Router } = require("express");

const { adminModel, courseModel } = require("../db");
const admin = require("../middleware/admin");
const { adminMiddleware } = require("../middleware/admin")
const { JWT_ADMIN_PASSWORD } = require("../config");

const adminRouter = Router();

adminRouter.post('/signup', async (req, res) => {
    const { email, password, firstName, lastName } = req.body; //todo: adding zod validation
    // todo: hash the password so plaintext pw is not stored in the db

    // todo: put inside a try catch block
    await adminModel.create({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    res.json({
        message: "Signup succeede!"
    })
})

adminRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // todo: ideally password should be hashed, and hence ypu can't compare the user provided password and database password
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        // do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})

adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    //Create a web3 saas in 6 hours video
    const course = await courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk', adminMiddleware, async (req, res) => {
    adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "Course Updated",
        courses
    })
})

module.exports = {
    adminRouter
}