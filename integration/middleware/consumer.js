const { dequeue, isEmpty } = require("./queue");

function processMessage() {
    if (isEmpty()) {
        console.log("\n[CONSUMER] No messages in queue.");
        return;
    }

    const message = dequeue();

    console.log("\n[CONSUMER] Processing flood event...");
    console.log(message);

    setTimeout(() => {
        if (message.status === "CRITICAL") {
            console.log(
                `[ALERT] CRITICAL flood alert for ${message.location} -> Water level: ${message.waterLevel} m`
            );
        } else if (message.status === "WARNING") {
            console.log(
                `[ALERT] WARNING flood alert for ${message.location} -> Water level: ${message.waterLevel} m`
            );
        } else {
            console.log(
                `[STATUS] Flood status for ${message.location} -> NORMAL`
            );
        }

        processMessage();
    }, 1000);
}

function startConsumer() {
    console.log("[CONSUMER] Alert/Notification consumer started.");
    processMessage();
}

module.exports = {
    startConsumer
};
