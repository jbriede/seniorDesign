 var gpio = require('rpi-gpio');
 var gpiop = gpio.promise;

var pin = 40;

gpiop.setup(pin, gpio.DIR_OUT).then(() =>
{
    console.log("off", pin);
    gpio.write(pin, false)
}).catch((err) => {
    console.log("CANT USE PIN", pin)
    console.log(err)
})
console.log("hi");