# SOLARIS Messaging Middleware Prototype

## Overview

This prototype demonstrates Message-Oriented Middleware (MOM) using a simple in-memory message queue. It is adapted to the SOLARIS Flood Monitoring System.

The middleware allows the flood monitoring module to send flood events to a message queue while the alert/notification module processes the messages asynchronously.

## Messaging Workflow

```text
SOLARIS Flood Monitoring / IoT Module
                |
                v
           Producer
                |
                v
          Message Queue
                |
                v
            Consumer
                |
                v
       Alert / Notification
```

## Components

### 1. Producer

The producer represents the SOLARIS flood monitoring module that generates flood monitoring events.

It creates messages containing:

- Location
- Water level
- Flood status
- Timestamp

The prototype uses three sample water levels:

- 0.5 m - NORMAL
- 0.7 m - WARNING
- 1.2 m - CRITICAL

### 2. Message Queue

The message queue temporarily stores the generated flood events.

The prototype uses a simple FIFO (First In, First Out) in-memory queue implemented in `queue.js`.

### 3. Consumer

The consumer represents the SOLARIS alert/notification module.

It retrieves messages from the queue and processes them asynchronously.

Depending on the flood status, the consumer displays either a normal status, warning alert, or critical alert.

## Files

```text
middleware/
|-- queue.js
|-- producer.js
|-- consumer.js
|-- demo.js
`-- README.md
```

## How to Run

From the project root:

```powershell
node integration\middleware\demo.js
```

## Expected Result

The producer generates three flood events and places them in the queue.

The consumer then processes each message:

```text
0.5 m -> NORMAL
0.7 m -> WARNING
1.2 m -> CRITICAL
```

The consumer continues processing until the queue is empty.

## Purpose

This prototype demonstrates asynchronous communication using the producer-consumer messaging pattern. In a future implementation, the in-memory queue can be replaced with a messaging platform such as RabbitMQ or Apache Kafka.

## SOLARIS Application

The messaging middleware can be used as an integration layer between the flood monitoring component and the alert/notification component.

Instead of directly connecting every component, flood events can be placed into a queue and processed by the appropriate consumer.

This approach separates the monitoring and notification processes and allows messages to be processed asynchronously.
