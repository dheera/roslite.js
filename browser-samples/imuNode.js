// imuNode.js
// by Dheera Venkatraman (`echo qurren | sed -e "s/\(.*\)/\1@\1.arg/" | tr a-z n-za-m`)

// This is a roslite.js node that runs inside a web browser and makes use of the
// HTML5 Web Sensors API to publish IMU data to /imu/data at 60 Hz.

(()=>{
  let nh = ros.initNode("imu_node");
  let pub_imu_data = nh.advertise("/imu/data", "sensor_msgs/Imu");
  let msg = { "@type": "sensor_msgs/Imu" };

  let gyroscopeSensor = null;
  if(window.Gyroscope) {
    gyroscopeSensor = new Gyroscope({
      frequency: 30,
      referenceFrame: "device"
    });
    gyroscopeSensor.addEventListener("reading", e => {
      msg.angular_velocity = {
        x: gyroscopeSensor.x,
        y: gyroscopeSensor.y,
        z: gyroscopeSensor.z,
      };
    });
    gyroscopeSensor.start();
  } else {
    console.log("imu_node: Gyroscope not found");
  }

  let linearAccelerationSensor = null;
  if(window.LinearAccelerationSensor) {
    linearAccelerationSensor = new LinearAccelerationSensor({
      frequency: 30,
      referenceFrame: "device"
    });
    linearAccelerationSensor.addEventListener("reading", e => {
      msg.linear_acceleration = {
        x: linearAccelerationSensor.x,
        y: linearAccelerationSensor.y,
        z: linearAccelerationSensor.z,
      };
    });
    linearAccelerationSensor.start();
  } else {
    console.log("imu_node: LinearAccelerationSensor not found");
  }

  let orientationSensor = null;
  if(window.AbsoluteOrientationSensor) {
    orientationSensor = new AbsoluteOrientationSensor({
      frequency: 30,
      referenceFrame: "device"
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
    orientationSensor.start();
  } else {
    console.log("imu_node: AbsoluteOrientationSensor not found");
  }

})();
