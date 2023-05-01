const express = require("express");
const path = require("path")
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/:blogId/comments', function(req, res, next){
});

const multer = require('multer');
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Create new comment
router.post('/:blogId/comments', upload.single('myImage'), async function(req, res, next){
    const file = req.file;

    const blogId = req.params.blogId;
    const comment = req.body.comment;

    const conn = await pool.getConnection()//สร้างConnection
    // Begin transaction
    await conn.beginTransaction();//เริ่ม Transaction

    try {
        const results = await pool.query(
            "INSERT INTO comments(blog_id, comment, `like`,comment_date) VALUES(?,?,0, CURRENT_TIMESTAMP);",
            [blogId, comment]
        )

        const comment_id = results[0].insertId

        if (file){
            await conn.query(
                "INSERT INTO images(blog_id, comment_id, file_path) VALUES(?,?,?);",
                [blogId, comment_id, file.path.substr(6)] //ไม่เอาstatic
            )
        }
        res.redirect(`/blogs/${blogId}`)
        await conn.commit()
    } catch (err) {
        return next(err)
    }
});

// Update comment
router.put('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.delete('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.put('/comments/addlike/:commentId', function(req, res, next){
    return
});


exports.router = router