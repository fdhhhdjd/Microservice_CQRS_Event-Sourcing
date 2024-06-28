const amqp = require("amqplib");

const { replaceTemplateStrings } = require("../helpers/stringHelpers");
const {
  rabbit: { user, password, host, port, link },
} = require("../configs/rabbit.configs");

class RabbitMQ {
  constructor() {
    this.connectionString = replaceTemplateStrings(link, {
      username: user,
      password: encodeURIComponent(password),
      host,
      port,
    });
    this.connection = null;
    this.channel = null;
  }

  async connect(retries = 5, timeout = 5000) {
    try {
      this.connection = await amqp.connect(this.connectionString);
      this.channel = await this.connection.createChannel();
      console.log("CONNECTED TO RABBIT MQ SUCCESS 🐰!");
    } catch (error) {
      console.error("Connection to RabbitMQ failed", error.message);
      if (retries > 0) {
        console.log(`Retrying to connect... (${retries} retries left)`);
        await new Promise((resolve) => setTimeout(resolve, timeout));
        return this.connect(retries - 1, timeout);
      } else {
        throw new Error("Max retries reached. Failed to connect to RabbitMQ.");
      }
    }
  }

  async publish(queue, message) {
    if (!this.connection || !this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: true });
    return this.channel.sendToQueue(queue, Buffer.from(message), {
      persistent: true,
    });
  }

  async consume(queue, callback) {
    if (!this.connection || !this.channel) {
      await this.connect();
    }
    await this.channel.assertQueue(queue, { durable: true });
    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        callback(msg.content.toString());
        this.channel.ack(msg);
      }
    });
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}

module.exports = new RabbitMQ();
