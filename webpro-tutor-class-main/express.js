const express = require('express');
const app = express();
const Joi = require('joi');

const pool = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/get_todo", async function(req, res, next){
//     const [data] = await pool.query('select * from todo')
//     //returnให้จบfunc send รอบเดียว
//     return res.send(data)
// })

//title และ description เป็น required field
//ในกรณี่ที่ไม่ส่ง due_date จะบันทึก due_date เป็นวันปัจจุบัน
//เลข order จะเพิ่มขึ้นไปเรื่อยๆ โดยคำนวณจาก MAX(order) + 1
//ข้อมูลที่แนบมากับ body ของ request จะมีลักษณะดังนี้
//คำสั่งในการ Query Date ให้เป็น ( yyyy-mm-dd )
const check_require = Joi.object({
  title: Joi.string().required(),
  //title: Joi.string().required().label("`divd `title"),
  description: Joi.string().required(),
  due_date: Joi.date()
})
app.post('/todo', async (req, res) => {
  try {
      await check_require.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
      console.log(err)
      //ส่งข้อความออกไปข้างนอก บรรทัด28
      // return res.status(400).send({message: err.details[0].context.label})
      
      if (!req.body.title) {
          return res.status(400).send({
              "message": "ต้องกรอก title"
          })
      }
      if (!req.body.description) {
          return res.status(400).send({
              "message": "ต้องกรอก description"
          })
      }
      return res.status(400).send(err)
  }

  const title = req.body.title
    const des = req.body.description

    let due_date = req.body.due_date
    const [order] = await pool.query('select MAX(t.order) as der from todo t')

    let der = order[0].der + 1

    if (!due_date) {
        due_date = new Date()
        console.log(due_date)
    } else {
        due_date = req.body.due_date
    }

    const conn = await pool.getConnection()
    await conn.beginTransaction()
    try {
        const [todo] = await conn.query('insert into todo(title, description,due_date, `order`) values(?,?,?, ?)', [title, des, due_date, der])
        const [getDate] = await conn.query(' SELECT *, DATE_FORMAT(due_date, "%Y-%m-%d") AS due_date FROM todo where id = ?', [todo.insertId])

        conn.commit()
        res.status(201).send({
            "message": `สร้าง ToDo '${title}' สำเร็จ`,
            "todo": {
                "id": todo.insertId,
                "title": title,
                "description": des,
                "due_date": getDate[0].due_date,
                "order": der
            }
        })
      } catch (err) {
        console.log(err)
    } finally {
        conn.release()
    }
})



const check_date = Joi.object({
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().required().when('start_date', {
      is: Joi.date().required(),
      then: Joi.date().min(Joi.ref('start_date')).required()
  })
})

app.get('/todo', async (req, res, next) => {
  const start_date = req.query.start_date
  const end_date = req.query.end_date
  if (start_date || end_date) {
      const [todo] = await pool.query(`
  select *, DATE_FORMAT(due_date, "%Y-%m-%d") AS due_date
  from todo
  where due_date between ? and ?`, [req.query.start_date, req.query.end_date])
      res.status(200).send(todo)
  }
  else {
      const [todo] = await pool.query(`
  select *, DATE_FORMAT(due_date, "%Y-%m-%d") AS due_date
  from todo`, [req.query.start_date, req.query.end_date])
      res.status(200).send(todo)

  }
})

// app.get('/todo', async (req, res) => {
//   console.log("enter")
//   try {
//       // await check_date.validate(req.query, { abortEarly: false })
//       await check_date.validateAsync(req.query, { abortEarly: false })
//   } catch (err) {
//       console.log(err)
//       return res.status(400).json(err)
//   }

//   const start_date = req.query.start_date
//   const end_date = req.query.end_date
//   console.log(start_date)
//   console.log(end_date)
//   const [todo] = await pool.query(`select *, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date from todo where due_date between ? and ?`, [start_date, end_date])

//   res.status(200).send(todo)

// })

// const d_date = Joi.object({
//   start_date: Joi.date().required(),
//     end_date: Joi.date().required().when('start_date', {
//         is: Joi.date().required(),
//         then: Joi.date().min(Joi.ref('start_date')).required()
//     })
//   // start_date: Joi.date().required(),
//   // end_date: Joi.date().required().min(Joi.ref('start_date'))
// })

// // app.post('/todo', async (req, res, next) => {
// //     console.log(req.body)
// //     // เริ่มต้นทำงาน
// //     const conn = await pool.getConnection();
// //     await conn.beginTransaction();
  
  
// //     const { title, description, due_date } = req.body
// //     try {
// //       // ตรวจสอบว่ามีการส่ง title มาหรือไม่
// //       if (!title) {
// //         return res.status(400).json({
// //           message: 'ต้องกรอก title'
// //         })
// //       }
// //       // ตรวจสอบว่ามีการส่ง description มาหรือไม่
// //       if (!description) {
// //         return res.status(400).json({
// //           message: 'ต้องกรอก description'
// //         })
// //       }
  
// //       const max_data = await conn.query("SELECT MAX(`order`) AS max FROM todo")
// //       const max_order = max_data[0][0].max + 1

// //       // ตรวจสอบว่ามีการส่ง due_date มาหรือไม่
// //     if (due_date) {//มีกรอกเวลา
// //         const [rows, fields] = await conn.query("INSERT INTO todo (title, description, due_date, todo.order) VALUES (?, ?, ?, ?)", 
// //         [title, description, due_date, max_order])
// //         const detail = await conn.query(`SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date  FROM todo WHERE id = ${rows.insertId}`)
  
// //         return res.status(201).json({
// //           'message': `สร้าง ToDo '${title}' สำเร็จ`,
// //           'todo': detail[0][0]
// //         })
// //       }
  
// //       else {//ไม่มีกรอกเวลา
// //         const [rows, fields] = await conn.query("INSERT INTO todo (title, description, due_date, todo.order) VALUES (?, ?, DATE_FORMAT(TIMESTAMP, '%Y-%m-%d'), ?)", [title, description, max_order])
// //         const detail = await conn.query(`SELECT *, DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date  FROM todo WHERE id = ${rows.insertId}`)
// //         return res.status(201).json({
// //           message: `สร้าง ToDo '${title}' สำเร็จ`,
// //           todo: detail[0][0]
// //         })
// //       }
// //     }
// //     catch (err) {
// //       console.log(err)
// //       next(err)
// //       conn.rollback();
// //     }
// //     finally {
// //       await conn.commit();
// //       conn.release();
// //     }
// //   })
  

// //ไม่ต้องเอา ?start_date=2022-05-15&end_date=2023-01-13 มาใส่ก็ได้
// //จะเป็นการค้นหาข้อมูล ToDo ทั้งหมดซึ่งมี due_date อยู่ตั้งแต่วันที่ 2023-01-01 ถึงวันที่ 2023-05-15
// app.get("/todo", async (req, res) => {
//     //  ไว้เช็คแบบ try cath ข้างล่าง
//     // const result = d_date.validate(req.query)
//     // if(result.error){
//     //     console.log(result.error.details)
//     //     return res.status(400).send(result.error.details)
//     // }
    
//     try {
//         //req.query เช็คค่าจาก path ข้างบนว่าใส่วันที่ถูกมั้ย
//         await d_date.validateAsync(req.query, { abortEarly: false })
//         //ถ้า abortEarly: true เจอปัญหาจะ respond กลับไปเลยว่ามีปัญหา
//         //ถ้า abortEarly: false จะ validate field ให้เสร็จก่อนแล้วค่อย respond กลับไปว่ามีปัญหา
//     } catch (err) {
//       console.log(err)
//       console.log("akjsdhjkasd")
//         return res.status(400).json(err)
        
//     }

//     var start_date = req.query.start_date
//     var end_date = req.query.end_date
//     console.log(start_date)
//     console.log(end_date)

//     const [data] = await pool.query('select *, DATE_FORMAT(due_date, "%Y-%m-%d") AS due_date from todo where due_date between ? and ?', [start_date,end_date])
//     return res.status(200).send(data)
// })

//ลบข้อมูลในตาราง todo
app.delete("/todo/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)

    const [data_todo] = await pool.query('select * from todo where id = ?', [id])

    if(data_todo.length == 0){
        return res.status(404).send({
            "message": `ไม่พบ ToDo ที่ต้องการลบ`,
        })
    }

    const conn = await pool.getConnection()
    //must have
    await conn.beginTransaction()

    try{
        const [data] = await pool.query("delete from todo where id = ?", [id])

        //must have
        await conn.commit()

        console.log(data_todo)
        console.log(data_todo[0])
        res.status(200).send({
            "message": `ลบ ToDo '${data_todo[0].title}' สำเร็จ`,
        })

    }catch(error){
        //must have
        conn.rollback()
        res.status(404)

    }finally{
        // if have Transaction must release
        conn.release()
    }
})

// function wine(){
//     return 'wine'
// }
// app.get('/wine', async(req, res)=>{

//     //ส่ง สองอันจะเอ๋อ
//     res.send(1)
//     res.send(2)

//     let arr = []
//     let nullVar = null

//     if (!nullVar){
//         res.send("nullVar is null")
//     }

//     if(arr.length == 0){
//         res.send("arr is null")
//     }
//     if(!arr.length){
//         res.send("arr is null")
//     }

// })

// app.get('/get', async(req, res)=>{

//     const [todo] = await pool.query('select * from todo where id = ?', [id])

//     const data = {name: 'wine'}
//     const {name} = data

//     const data1 = [[2232434],[323434]]
//     const {w1,w2} = data
// })


/** 
 *  เริ่มทำข้อสอบได้ที่ใต้ข้อความนี้เลยครับ
 * !!! ไม่ต้องใส่ app.listen() ในไฟล์นี้นะครับ มันจะไป listen ที่ไฟล์ server.js เองครับ !!!
 * !!! ห้ามลบ module.exports = app; ออกนะครับ  ไม่งั้นระบบตรวจไม่ได้ครับ !!!
*/

module.exports = app;
