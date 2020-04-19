// imuNode.js
// by Dheera Venkatraman (`echo qurren | sed -e "s/\(.*\)/\1@\1.arg/" | tr a-z n-za-m`)

// This is a roslite.js node that runs inside a web browser and makes use of the
// HTML5 Web Sensors API to publish IMU data to /imu/data at 60 Hz.

(()=>{
  let nh = ros.initNode("imu_node");
  let pub_imu_data = nh.advertise("/imu/data", "sensor_msgs/Imu");
  let msg = { "@type": "sensor_msgs/Imu" };

  let gyroscopeSensor = new Gyroscope({
    frequency: 60,
    referenceFrame: "device"
  });

  let linearAccelerationSensor = new LinearAccelerationSensor({
    frequency: 60,
    referenceFrame: "device"
  });

  let orientationSensor = new AbsoluteOrientationSensor({
    frequency: 60,
    referenceFrame: "device"
  });

  gyroscopeSensor.addEventListener("reading", e => {
    msg.angular_velocity = {
      x: gyroscopeSensor.x,
      y: gyroscopeSensor.y,
      z: gyroscopeSensor.z,
    };
  });

  linearAccelerationSensor.addEventListener("reading", e => {
    msg.linear_acceleration = {
      x: linearAccelerationSensor.x,
      y: linearAccelerationSensor.y,
      z: linearAccelerationSensor.z,
    };
  });

  orientationSensor.addEventListener("reading", e => {
    msg.orientation = {
      x: orientationSensor.quaternion[0],
      y: orientationSensor.quaternion[1],
      z: orientationSensor.quaternion[2],
      w: orientationSensor.quaternion[3],
    };
    msg.header = {
      timestamp: orientationSensor.timestamp,
      frame_id: "imu",
    };
    pub_imu_data.publish(msg);
  });

  gyroscopeSensor.start();
  linearAccelerationSensor.start();
  orientationSensor.start();

})();
