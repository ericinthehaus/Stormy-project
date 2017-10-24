var xpos = 50;
var ypos = -1000;
var size = 20;

var a = 1000;
var b = 2000;
var c = 3000;



var cloudy = false;

var num;

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = 0; // for outgoing data

function setup() {
    createCanvas(windowWidth, windowHeight); // make the canvas
    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors


    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('close', portClose); // callback for the port closing

    //serial.list(); // list the serial ports
    serial.open(portName); // open a serial port
}

function draw() {

    if (cloudy == true){
        drawCloudy();
        rain();
        
    }
    

    if (keyIsPressed) {
         if (key == '2'){

        cloudy = true;
        
         }
        if (key == '8'){
            drawSunny();
            cloudy = false;
        }
        

    } else


        num = random(0, windowWidth);



}

function drawCloudy() {
    background(0, 0, 150);


    fill(255, 255, 0);
    ellipse(50, 50, 50, 50);

    fill(200);
    ellipse(a, 0, 1200, 200);
    ellipse(b, 0, 1500, 200);
    ellipse(c, 0, 900, 200);
    fill(130, 160, 5);
    rect(-10, windowHeight - 100, windowWidth + 20, 300);

    a = a - 2;
    b = b - 2;
    c = c - 2;

    if (a < -1000) {
        a = windowWidth + 1000;
    }
    if (b < -1000) {
        b = windowWidth + 1000;
    }
    if (c < -1000) {
        c = windowWidth + 1000;
    }

}

function drawSunny() {

    background(50, 170, 255);

    fill(255, 255, 0);
    ellipse(50, 50, 50, 50);

    fill(130, 255, 5);
    rect(-10, windowHeight - 100, windowWidth + 20, 300);

}

function rain() {
    fill(0, 0, 255);

    ellipse(xpos, ypos, size, size);

    ypos = ypos + 70;
    xpos = xpos - 7;

    if (ypos >= windowHeight) {

        ypos = 0;
        xpos = num;
        size = random(10, 30);
        num = random(0, windowWidth);
    }

}



function serialEvent() {
    //read a byte from the serial port:
    var inByte = serial.read();
    //store it in a global variable:
    inData = inByte;
}

function keyPressed() {
    if (key == 2) { // if the user presses 0 through 9
        //outByte = byte(key * 25); // map the key to a range from 0 to 225
        serial.write('2'); // send it out the serial port
    }


    if (key == 8) {

        serial.write('8');
    }
}




function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
    console.log('The serial port closed.');
}

function printList(portList) {
    for (var i = 0; i < portList.length; i++) {
        console.log(i + " " + portList[i]);
    }
}


function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}
