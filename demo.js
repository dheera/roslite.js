ros = require("./roslite.js");

// node A
(() => {
  let nh = ros.initNode("node_A");
  let subTest = nh.subscribe("/test", "std_msgs/String", (msg) => {
    console.log("A received", msg);
  });
})();

// node B
(() => {
  let nh = ros.initNode("node_B");
  let pubTest = nh.advertise("/test", "std_msgs/String");
  let i = 0;
  setInterval(()=> {
    pubTest.publish({
      "@type": "std_msgs/String",
      "data": "hello world " + i,
    });
    i++;
  }, 1000);
})();
