const fs = require('fs');
var gpio = require('rpi-gpio');
var gpiop = gpio.promise;

class TemperatureRegulator {
  constructor() {
    this.current_temp = 50;

    let rawdata = fs.readFileSync('temp.json');  //read temp file
    this.desired_temp = JSON.parse(rawdata);    // read last teimp from file

    this.peltier_status = false; //peltier enable status
    this.regulate_temp();
    setInterval(() =>
    {
      this.regulate_temp();
    },
    2000)
  }

  get_current_temp()
  {
    // temp = sensor.read(11 , 26, function(err, temperature, humidity) {
    //   if (!err) {
    //       console.log('temp: ' + temperature.toFixed(1) + '°C, ' + 'humidity: ' + humidity.toFixed(1) + '%');
    //   }
    // });
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
      if (this.peltier_status == false) //is peltier disabled? Enable. Else, do nothing
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