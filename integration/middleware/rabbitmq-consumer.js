const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "solaris_flood_alerts";

async function startConsumer() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {
        durable: true
    });

    console.log("[RABBITMQ CONSUMER] Waiting for flood alerts...");
    console.log("[RABBITMQ CONSUMER] Press CTRL+C to stop.\n");

    channel.consume(QUEUE_NAME, (message) => {
        if (message === null) {
            return;
        }

        const data = JSON.parse(message.content.toString());

        console.log("[RABBITMQ CONSUMER] Message received:");
        console.log(data);

        if (data.status === "CRITICAL") {
            console.log(
                `[ALERT] CRITICAL flood alert for ${data.location} -> Water level: ${data.waterLevel} m`
            );
        } else if (data.status === "WARNING") {
            console.log(
                `[ALERT] WARNING flood alert for ${data.location} -> Water level: ${data.waterLevel} m`
            );
        } else {
            console.log(
                `[STATUS] Flood status for ${data.location} -> NORMAL`
            );
        }

        console.log("----------------------------------------");

        channel.ack(message);
    });
}

startConsumer().catch((error) => {
    console.error("[RABBITMQ CONSUMER] Error:", error.message);
});
