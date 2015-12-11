var com = require("serialport");
var inquirer = require("inquirer");
var dgram = require('dgram');
var serialPort;
var questions = [{
  type: 'list',
  name: 'serialPort',
  message: 'Which serial port would you like to communicate with?',
  choices: []
}];
var PORT = 33333;
var HOST = '0.0.0.0';
var server = dgram.createSocket('udp4');



function initUDPListener() {
  server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
  });

  server.on('message', function (message, remote) {
    console.dir(message);
    serialPort.write(message);

  });

  server.bind(PORT, HOST);
}

function startPort(portName) {
  serialPort = new com.SerialPort(portName, {
    baudrate: 9600,
    // defaults for Arduino serial communication
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
  });

  serialPort.on('open', initUDPListener);
}

com.list(function (err, ports) {
  ports.forEach(function (port) {
    questions[0].choices.push(port.comName);
  });

  inquirer.prompt(questions, function (answers) {
    startPort(answers.serialPort);
  });
});

