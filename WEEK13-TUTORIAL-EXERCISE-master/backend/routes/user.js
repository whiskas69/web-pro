const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')

router = express.Router();

//custom validator => func
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')//< 8 show err
    }
    //> 8 chack เป็น eng ตัวเล็ก-ใหญ่ ตัวเลข
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query(
        "SELECT username FROM users WHERE username = ?",
        [value]
    )
    //ถ้าหาเจอ ชื่อซ้ำแจ้ง err
    if (rows.length > 0) {
        const message = 'This user is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().email().required().max(100), // ต้องกรอก และ เป็น email ที่ถูกต้อง,
    mobile: Joi.string().required().pattern(/0[0-9]{9}/),//patternเริ่ม 0 ต่อด้วยเลข 0-9 ความยาว 9 ตัว
    first_name: Joi.string().required().min(3).max(150),// ต้องกรอก ไม่เกิน 150 ตัวอักษร
    last_name: Joi.string().required().min(3).max(150),// ต้องกรอก ไม่เกิน 150 ตัวอักษร
    password: Joi.string().required().custom(passwordValidator),
    confirm_password: Joi.string().required().equal(Joi.ref('password')), // ต้องเหมือนกับ password
    username: Joi.string().required().min(5).external(usernameValidator),//ถ้าต้องติดต่อกับฐานข้อมูลต้องใช้ external

})

router.post('/user/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
        //ถ้า abortEarly: true เจอปัญหาจะ respond กลับไปเลยว่ามีปัญหา
        //ถ้า abortEarly: false จะ validate field ให้เสร็จก่อนแล้วค่อย respond กลับไปว่ามีปัญหา
    } catch (err) {
        return res.status(400).json(err)
    }

    //validate เสร็จก็เก็บข้อมูลใส่ตัวแปรจะบันทึกข้อมูลลงดาต้าเบส
    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5) //hash password เก็บเป็น str ที่อ่านไม่ออกละ
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const mobile = req.body.mobile

    try {
        await conn.query(
            'INSERT INTO users(username, password, first_name, last_name, email, mobile) ' +
            'VALUES (?, ?, ?, ?, ?, ?)',
            [username, password, first_name, last_name, email, mobile]
        )
        conn.commit()
        res.status(201).send()
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
})

exports.router = router