class ROSLitePublisher {
  constructor(node, topicName, topicType) {
    this.node = node;
    this.topicName = topicName;
    this.topicType = topicType;
  }

  publish(msg) {
    if(!("@type" in msg)) {
      console.error("error: message contains no @type", msg);
      return;
    }

    this.node._publish(this.topicName, msg);
  }
}

module.exports = ROSLitePublisher;
