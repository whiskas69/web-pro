function plus(input){
    let total = 0;
    for (let i = 0; i< input.length; i++){
        total += input[i]
    }
    return total
    // TODO: สร้าง function ที่นำ input จำนวน 2 ตัวมาบวกกัน
    
}

// TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
// *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
// global variable
let a = 'Hello';

function greet() {
    // local variable
    let b = 'World';
    if (b == 'World') {
        // block-scoped variable
        let c = 'hello';
    }

    // variable c cannot be accessed here
    console.log(a + ' ' + b + ' ' + c);
    return a + ' ' + b + ' ' + c
}

function varLetConst() {
    // TODO: แก้ประเภทตัวแปลใน function นี้ให้ค่าที่ return ออกมาตรงกับคำตอบ 41
    // *** เปลี่ยนได้เฉพาะประเภทตัวแปล ***
    const k = 5
    var j = 30
    var i = 0
    for (let j = 0; j <= 5; j++) {
        i++
    }
    for (let j = 0; j <= 5; j++) {
        j++
    }
    console.log(j)
    console.log(i)
    console.log(k)
    console.log(j + k + i)
    return j + k + i
}

function chainfunction(input){
    let txt = input.trim().split(" ")
    
    
    // TODO: จงใช้ String method และการ chain function ให้ผลลัพธ์ตรงตามโจทย์

    //เขียนต่อจาก Return ได้เลยครับ
    return txt[0].toUpperCase() + " " + txt[1].toLowerCase()
}