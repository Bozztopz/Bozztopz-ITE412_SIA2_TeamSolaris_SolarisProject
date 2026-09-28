const { enqueue } = require("./queue");

function sendFloodEvent(waterLevel) {
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

    console.log("\n[PRODUCER] Flood event detected:");
    console.log(message);

    enqueue(message);
}

function produceFloodEvents() {
    sendFloodEvent(0.5);
    sendFloodEvent(0.7);
    sendFloodEvent(1.2);
}

module.exports = {
    sendFloodEvent,
    produceFloodEvents
};
