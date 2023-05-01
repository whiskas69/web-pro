function getDayName (input) {
    const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    return daysInWeek[input]
}

function formatDate (input) {
    const day = ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์'];
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    return day[input.day] + 'ที่ ' + input.date + ' ' + month[input.month] + " พ.ศ. " + (input.year + 543)
}

function findTotal (input) {
    let total = 0;
    for (let i = 0; i< input.length; i++){
        total += input[i]
        //console.log(input[i])
    }
    return total
    // return input.reduce((total, value, index, array) => {
    //     return total + value
    // })
    
}