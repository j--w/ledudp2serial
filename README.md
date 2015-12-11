# ledudp2serial
Simple node udp server to pass udp data to serial on arduino.


Install [nodejs](https://nodejs.org/en/)

In terminal:


```
npm install
sudo node index.js
```

NOTE: sudo may be required in order to access serial port. Once you run the script it will ask you which serial port to use. UDP port is 33333

Ive included a basic arduino test script that recieves a digit and changes the interval of blinking on the onboard LED.
