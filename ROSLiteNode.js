const ROSLiteSubscriber = require("./ROSLiteSubscriber.js");
const ROSLitePublisher = require("./ROSLitePublisher.js");

class ROSLiteNode {
  constructor(core, nodeName) {
    this.core = core;
    this.nodeName = nodeName;
    this.subscribers = {};
    this.core._registerNode(this);
  }

  advertise(topicName, topicType) {
    return new ROSLitePublisher(this, topicName, topicType);
  }

  subscribe(topicName, topicType, callback) {
    this.subscribers[topicName] = new ROSLiteSubscriber(this, topicName, topicType, callback);
    this.core._subscribe(this, topicName, topicType);
    return this.subscribers[topicName];
  }

  _notify(topicName, msg) {
    if(!("@type" in msg)) {
      console.error("error: message contains no @type", msg);
      return;
    }

    this.subscribers[topicName]._notify(msg);
  }

  _publish(topicName, msg) {
    if(!("@type" in msg)) {
      console.error("error: message contains no @type", msg);
    }

    this.core._publish(this, topicName, msg);
  }
}

module.exports = ROSLiteNode;
