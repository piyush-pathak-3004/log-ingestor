const amqp = require("amqplib"); 
const express = require("express");

const PORT = 3003;

const app = express();

async function publishToQueue(logData) {
    console.log("inside PublishToQueue...");
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'logPropagationQueue';

        await channel.assertQueue(queue, { durable: false });
        const message = JSON.stringify(logData);

        // Publish the log data to the message queue
        channel.sendToQueue(queue, Buffer.from(message));

        console.log("Message sent to queue:", message);

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error("Error publishing to the message queue:", error);
    }
}

// app.listen(PORT, () => {
//     console.log(`Write Worker is running on http://localhost:${PORT}`);
// });


module.exports = publishToQueue;
