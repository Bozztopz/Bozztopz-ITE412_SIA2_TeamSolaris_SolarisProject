const { produceFloodEvents } = require("./producer");
const { startConsumer } = require("./consumer");

console.log("========================================");
console.log("   SOLARIS MESSAGING MIDDLEWARE DEMO");
console.log("========================================");

console.log("\n[1] Starting flood monitoring producer...");
produceFloodEvents();

console.log("\n[2] Starting alert/notification consumer...");
startConsumer();
