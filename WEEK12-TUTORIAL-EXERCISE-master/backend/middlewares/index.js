const pool = require("../config");

async function isLoggedIn(req, res, next) {
    // get data in headers
    //authorization สิทธิ์ในการเข้าถึง
    let authorization = req.headers.authorization

    //ไม่ได้แนบ authorization จะขึ้นว่าไม่ได้ login
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }

    // header:{'authorization': 'Bearer $token'}
    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }

    // Check token
    const [tokens] = await pool.query('SELECT * FROM tokens WHERE token = ?', [part2])
    const token = tokens[0]// obj
    if (!token) {
        return res.status(401).send('You are not logged in')
    }

    // Set user
    const [users] = await pool.query(
        'SELECT *' +
        'FROM users WHERE id = ?', [token.user_id]
    )
    // ข้อมูลของ user คนที่login เข้ามา
    req.user = users[0]

    next()
}

async function logger(req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    // ดูว่าเข้าตอนไหน path อะไร
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    //ทำ method ถัดไป
    next()
}


module.exports = {
    logger,
    isLoggedIn
}