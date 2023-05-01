const express = require("express");

const router = express.Router();

const pool = require("../config");

// Get comment
router.get('/:blogId/comments', async function (req, res, next) {
});

// Create new comment
router.post('/:blogId/comments', async function (req, res, next) {
    try {
        //ทำการ select ข้อมูล blog
        // const [rows2, fields2] = await pool.query("SELECT * FROM comments");

        const [rows, fields] = await pool.query(
            "INSERT INTO comments(blog_id, comment, comments.like, comment_by_id) VALUES(?,?,?,null);",
            [req.params.blogId, req.body.comment, req.body.like, req.body.comment_by_id]
        )

        // console.log('rows', rows.insertId)
        // console.log('com', req.body.comment)

        // return json response
        res.json({ message: `A new comment is added (ID: ${rows.insertId})` })
    } catch (err) {
        return next(err)
    }
});

// Update comment
router.put('/comments/:commentId', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query(
            "UPDATE comments SET comment=?, comments.like=?, comment_date=?, comment_by_id=?, blog_id=?  WHERE id=?",
            [
                req.body.comment,
                req.body.like,
                req.body.comment_date,
                req.body.coment_by_id,
                req.body.blog_id,
                req.params.commentId
            ])

        console.log('rows', rows.insertId)

        // const [rows2, fields2] = await pool.query(
        //     "SELECT * FROM comments WHERE id=?", [req.params.commentId]
        // );
        console.log(req.body.comment)
        // return json response
        res.json({
            message: `Comment ID ${req.params.commentId} is updated.`
            , comment: req.body
        })
    } catch (err) {
        return next(err)
    }
});

// Delete comment
router.delete('/comments/:commentId', async function (req, res, next) {
    try {

        const [rows, fields] = await pool.query(
            'DELETE FROM comments WHERE id = ?',
            [req.params.commentId]
        )
        res.json({
            message: `Comment ID ${req.params.commentId} is deleted.`
        })
    } catch (err) {
        return next(err)
    }
});

// Addlike comment
router.put('/comments/addlike/:commentId', async function (req, res, next) {
    try {
        const [rows, fields] = await pool.query("SELECT * FROM comments WHERE id=?", [ //query reture promise
          req.params.commentId,
        ]);
        //ข้อมูล comment ที่เลือกจะอยู่ในตัวแปร rows is array
        console.log('Selected comment =', rows)
        //สร้างตัวแปรมาเก็บจำนวน like ณ ปัจจุบันของ comment ที่ select มา
        let likeNum = rows[0].like 
        console.log(rows[0])// obj
        // console.log('Like num =', likeNum) // console.log() จำนวน Like ออกมาดู
        //เพิ่มจำนวน like ไปอีก 1 ครั้ง
        likeNum += 1
    
        //Update จำนวน Like กลับเข้าไปใน DB
        const [rows2, fields2] = await pool.query("UPDATE comments SET comments.like=? WHERE comments.id=?", [
          likeNum, req.params.commentId,
        ]);
    
        //Redirect ไปที่หน้า index เพื่อแสดงข้อมูล
        // res.redirect('/');//reset page
    
        // return json response
        return res.json({
          blogId: rows[0].blog_id,
          commentID: req.params.commentId,
          likeNum: likeNum
        })
      } catch (err) {
        return next(err);
      }
});


exports.router = router