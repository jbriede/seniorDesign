class TemperatureRegulator {
  constructor() {
    this.current_temp = 50;
    this.desired_temp = 50;
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
  }
  regulate_temp(set_temp)
  {
    //loop to ensure temp is desired temp
  }



}

module.exports = TemperatureRegulator;  