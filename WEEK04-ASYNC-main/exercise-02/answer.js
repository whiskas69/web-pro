// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    // You code here
    if(confirm("ยืนยันไหม???") == true){
        display("ยืนยันจ้า");
    }
    else{
        display("ไม่ดีกว่า");
    }
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    let start = document.getElementById('start');
    let process = document.getElementById('process');
    let end = document.getElementById('end');

    setTimeout(function(){
        start.innerHTML = "Program started"
        setTimeout(function(){
            process.innerHTML = "Hello World"
            setTimeout(function(){
                end.innerHTML = "Program ended"
            }, 3000);
        }, 2000);
    }, 0);
    
    
}

// ข้อ 2.3
function stopTime() {
    var time = document.getElementById('Time').value
    var min = Math.floor((time / 60) % 60)
    var sec = Math.floor(time % 60)
    
    //min.innerHTML = Math.floor((time / 60) % 60)
    // setTimeout(function(){
    //     min.innerHTML = Math.floor((time / 60) % 60)
    // }, 100);

    // setTimeout(function(){
    //     sec.innerHTML = Math.floor(time % 60)
    // }, 100);

    var count = setInterval(function(){
        document.getElementById('setMinute') = min.toLocaleString('en-US','minimumIntegerDigits: 2').innerHTML
        document.getElementById('setSecond') = sec.toLocaleString('en-US','minimumIntegerDigits: 2').innerHTML

        // if (sec != 00){
        //     sec --;
        // }

        // else if (min == 00 && sec != 00){
        //     sec = 59;
        // }
    }, 1000)

}

