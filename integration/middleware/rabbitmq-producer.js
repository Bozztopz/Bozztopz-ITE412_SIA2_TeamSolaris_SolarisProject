const amqp = require("amqplib");

const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "solaris_flood_alerts";

async function sendFloodEvent(waterLevel) {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, {
        durable: true
    });

    let status = "NORMAL";

    if (waterLevel >= 1.0) {
        status = "CRITICAL";
    } else if (waterLevel >= 0.7) {
        status = "WARNING";
    }

    const message = {
        type: "flood_alert",
        location: "Barangay Duongan",
        waterLevel: waterLevel,
        status: status,
        timestamp: new Date().toISOString()
    };

    channel.sendToQueue(
        QUEUE_NAME,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );

    console.log("[RABBITMQ PRODUCER] Message sent:");
    console.log(message);

    await channel.close();
    await connection.close();
}

async function produceFloodEvents() {
    await sendFloodEvent(0.5);
    await sendFloodEvent(0.7);
    await sendFloodEvent(1.2);
}

produceFloodEvents().catch((error) => {
    console.error("[RABBITMQ PRODUCER] Error:", error.message);
});
