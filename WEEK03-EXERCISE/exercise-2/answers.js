function convertADtoBE(input) {
    if (typeof input == "number" && input > 0 ){
        return "พ.ศ." + " " + (input+543)
    }
    if (input < 0){
        return "พ.ศ." + " " + (Math.abs(input)+543)
    }
    else{
        return "ไม่ถูกต้อง"
    }
}

function evenOrOdd(input) {
    if (input % 2 == 0){
        return "even"
    }
    else {
        return "odd"
    }
    // TODO: ให้ตรวจสอบว่าตัวเลข input เป็นเลขคู่หรือเลขคี่
}

function getFullName(input) {
    if (input.sex == "male"){
        return "Mr." + " " + input.firstName +  " " + input.lastName
    }
    else{
        return "Ms." + " " + input.firstName +  " " + input.lastName
    }
}

function getFirstName(input) {
    return input.substr(0, input.indexOf(" "))
}