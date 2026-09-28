const messages = [];

function enqueue(message) {
    messages.push(message);
    console.log("Message added to queue.");
}

function dequeue() {
    return messages.shift();
}

function isEmpty() {
    return messages.length === 0;
}

module.exports = {
    enqueue,
    dequeue,
    isEmpty
};
