function mapToSquare (input) {
    return input.map((value) => {
        return value * value
    })
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }
    return input.map((value) => {
        return {
            "date" : value.date,
            "temperature" : fah_to_celsius(value.temperature)
        }
    })
}

function filterEvenNumber (input) {
    return input.filter(arr => arr % 2 == 0)
    // TODO: filter input เอาเลขคู่เท่านั้น
}

function filterAgeRange (input) {
    // เอาคนชื่อนำหน้าด้วย a tpye vip other nomal
    const peo = input.people
    
    return peo.filter((value) => {
        return input.min < value.age  && value.age < input.max
    })
    // TODO: กรอง input.people ตามช่วงอายุ
}

function removeByFilter (input) {
    const peo = input.people

    return peo.filter((value) => {
       return value.id != input.removeId
       
    })
    // TODO: ลบ Object ใน Array ด้วยการ filter
}

function replaceBySplice (input) {
    input.splice(4, 2, 10, 11, 12)
    return input
}
