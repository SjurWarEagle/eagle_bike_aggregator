"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = require("mqtt");
const dotenv_1 = require("dotenv");
const process = require("process");
const bike_data_aggregated_1 = require("./types/bike-data-aggregated");
const bike_data_aggregate_1 = require("./services/bike-data-aggregate");
(0, dotenv_1.config)();
const connectUrl = `mqtt://192.168.73.148`;
const clientId = process.env.MQTT_CLIENT_ID;
const mqttOutputTopicBase = process.env.MQTT_OUTPUT_TOPIC_BASE;
let bikeDataAggregated = new bike_data_aggregated_1.BikeDataAggregated();
const serviceBikeDataAggregate = new bike_data_aggregate_1.BikeDataAggregate();
function publish(client, bikeDataAggregated) {
    const message = JSON.stringify(bikeDataAggregated);
    client.publish(mqttOutputTopicBase + 'data', message, () => {
    });
}
async function start() {
    const client = await (0, mqtt_1.connect)(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD,
        reconnectPeriod: 1000,
    });
    client.on('connect', () => {
        client.subscribe('/livingroom/bike', () => {
            client.on('message', async (topic, message, packet) => {
                const bikeData = JSON.parse(message.toString());
                bikeDataAggregated = await serviceBikeDataAggregate.aggregate(bikeData);
                publish(client, bikeDataAggregated);
            });
        });
    });
    client.on('message', function (topic, message) {
        const bikeData = JSON.parse(message.toString());
    });
}
start();
//# sourceMappingURL=start.js.map