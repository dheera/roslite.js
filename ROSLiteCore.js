class ROSLiteCore {
  constructor() {
    this.topics = {};
    this.nodes = {};
  }

  _registerNode(node) {
    this.nodes[node.nodeName] = node;
  }

  _publish(nodeName, topicName, msg) {
    if(!("@type" in msg)) {
      console.error("error: message contains no @type", msg);
      return;
    }

    if(!(topicName in this.topics)) {
      this.topics[topicName] = {
        topicType: msg["@type"],
        subscriberNodes: [],
      };
    }

    if(this.topics[topicName].topicType !== msg["@type"]) {
      console.error("error: topic " + topicName + " is of type " + this.topics[topicName].topicType + 
        " but a message of type " + msg["@type"] + " was published to it");
      return;
    }

    this.topics[topicName].subscriberNodes.forEach(subscriberNode => {
      subscriberNode._notify(topicName, msg);
    });
  }

  _subscribe(node, topicName, topicType) {
    if(!(topicName in this.topics)) {
      this.topics[topicName] = {
        topicType: topicType,
        subscriberNodes: [],
      };
    }
    this.topics[topicName].subscriberNodes.push(node);
  }
};

module.exports = ROSLiteCore;

