class ROSLiteSubscriber {
  constructor(node, topicName, topicType, callback) {
    this.node = node;
    this.topicName = topicName;
    this.topicType = topicType;
    this.callback = callback;
  }

  _notify(msg) {
    if(!("@type" in msg)) {
      console.error("error: message contains no @type", msg);
      return;
    }

    this.callback(msg);
  }
}

module.exports = ROSLiteSubscriber;
