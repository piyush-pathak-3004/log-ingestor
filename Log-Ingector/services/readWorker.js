const amqp = require('amqplib');
const { ReadLog } = require('../dbs/db');

async function consumeFromQueue() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'logPropagationQueue';

        await channel.assertQueue(queue, { durable: false });

        console.log("Waiting for messages...");

        channel.consume(queue, async (message) => {
            const logData = JSON.parse(message.content.toString());
            console.log("Received message:", logData);

            // Update the read database with the received log data
            await updateReadDatabase(logData);

            // Acknowledge the message
            channel.ack(message);
        }, { noAck: false });
    } catch (error) {
        console.error("Error consuming from the message queue:", error);
    }
}

async function updateReadDatabase(logData) {
    try {
        const log = new ReadLog({
            level: logData.level,
            message: logData.message,
            resourceId: logData.resourceId,
            timestamp: logData.timestamp,
            traceId: logData.traceId,
            spanId: logData.spanId,
            commit: logData.commit,
            metadata: {
                parentResourceId: logData.metadata ? logData.metadata.parentResourceId : null
            }
        });

        await log.save();

        console.log("Log propagated to read database:", logData);
    } catch (error) {
        console.error("Error updating read database:", error);
    }
}

consumeFromQueue();
