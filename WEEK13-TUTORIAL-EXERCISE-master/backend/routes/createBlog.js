const express = require("express");
const pool = require("../config");
const Joi = require('joi')
const bcrypt = require('bcrypt')

router = express.Router();



const createBlogSchma = Joi.object({
    title: Joi.string().required().pattern(/^[a-zA-Z]+$/).min(10).max(25),
    content: Joi.string().required().max(5),
    status: Joi.string().valid('status_private','status_public'),
    reference: Joi.string(),
    start_date: Joi.string(),
    end_date: Joi.string(),
})



router.post('/blogs/create', async (req, res, next) => {
    try {
      await createBlogSchma.validateAsync(req.body,  { abortEarly: false })
    } catch (err) {
      return res.status(400).json(err)
    }
    res.send('ok')
})



exports.router = router