const fs = require('fs');
var gpio = require('rpi-gpio');
var gpiop = gpio.promise;
var sensor = require('node-dht-sensor');

class TemperatureRegulator {
  constructor() {
    this.current_temp = 50;
    this.peltier_disable = false;

    let rawdata = fs.readFileSync('temp.json');  //read temp file
    this.desired_temp = JSON.parse(rawdata);    // read last teimp from file

    this.peltier_status = false; //peltier enable status
    this.regulate_temp();
    setInterval(() =>
    {
      this.regulate_temp();
    },
    30000)
  }

  disable_peltier()
  {
    this.peltier_disable = true; //set flag so peltier doesn't get enabled
    if (this.peltier_status == true) //disable peltier if it's enabled
    {
      this.turnoff2(22); //update with pin
      this.turnoff2(12); //update with pin
      console.log("\nDisable Peltier")
    }
  }

  enable_peltier()
  {
    this.peltier_disable = false;

    if (this.peltier_status == true) //enable peltier if it's enabled
    {
      this.turnon(22);
      this.turnon(12);
      console.log("\nEnable Peltier");
    }
  }
  get_current_temp()
  {let blah = this;
    var temp = sensor.read(11 , 26, function(err, temperature, humidity) {
    if (!err) {
           console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
           blah.current_temp = temperature.toFixed(1)*(9/5) + 32;

       }
    });
        return this.current_temp;
  }

  get_desired_temp(desired_temp)
  {
    return this.desired_temp;
  }

  set_temp(new_temp)
  {
    this.desired_temp = new_temp;
    console.log("new temp is: ", this.desired_temp)
    let temp = JSON.stringify(this.desired_temp);  
    fs.writeFileSync('temp.json', temp);
    this.regulate_temp();
  }
  regulate_temp()
  {
    //loop to ensure temp is desired temp

    this.get_current_temp();
    if (this.desired_temp < this.current_temp)
    {
      if (this.peltier_status == false && this.peltier_disable == false) //is peltier disabled? Endisable_peltdisable_peltierierable. Else, do nothing
      {
        console.log("\nenable peltier") //enable peltier
        this.peltier_status = true;
        this.turnon(22);
        this.turnon(12);
      }
    }
    else
    {
      if (this.peltier_status == true) // if peltier is enabled, disable. Else do nothing
      {
        console.log("\nDisable Peltier") //disable peltier
        this.peltier_status = false;
        this.turnoff2(22); //update with pin
        this.turnoff2(12); //update with pin
      }
    }

  }


  turnoff2(pin)
  {
    gpiop.setup(pin, gpio.DIR_OUT).then(() =>
     {
     	console.log("off", pin);
     	return gpio.write(pin, false)
     }).catch((err) => {
     	console.log("CANT USE PIN", pin)
     	console.log(err)
     })
  }

  turnon(pin)
{
	 gpiop.setup(pin, gpio.DIR_OUT).then(() =>
	 {
	 	return gpio.write(pin, true)
	 }).catch((err) => {
	 	console.log(err)
	 })
}



}

module.exports = TemperatureRegulator;  
