import {connect, MqttClient} from "mqtt"
import * as process from "process";
import {BikeData} from "./types/bike-data";
import {BikeDataAggregated} from "./types/bike-data-aggregated";
import {BikeDataAggregate} from "./services/bike-data-aggregate";
import {config} from 'dotenv';

config();

export class Start {
    private connectUrl = `mqtt://192.168.73.148`
    private clientId: string = process.env.MQTT_CLIENT_ID;
    private mqttOutputTopicBase = process.env.MQTT_OUTPUT_TOPIC_BASE;
    private bikeDataAggregated = new BikeDataAggregated();
    private serviceBikeDataAggregate = new BikeDataAggregate();

    public publish(client: MqttClient, bikeDataAggregated: BikeDataAggregated) {
        // // publish a message to a topic
        const message = JSON.stringify(bikeDataAggregated);
        client.publish(this.mqttOutputTopicBase + 'data', message, () => {
            // console.log("Message of ", message, " is published");
            // client.end(); // Close the connection when published
        });
    }

    public async start(): Promise<void> {

        const mqttConfig = {
            clientId: this.clientId,
            clean: true,
            connectTimeout: 4000,
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASSWORD,
            reconnectPeriod: 1000,
        };
        console.log('mqttConfig', mqttConfig);

        const client = await connect(this.connectUrl, mqttConfig)

        client.on('connect', () => { // When connected

            // // subscribe to a topic
            // client.subscribe('relay', () => {
            //     // when a message arrives, do something with it
            //     client.on('message', (topic, message, packet) => {
            //         // console.log(packet);
            //         console.log("Received '" + message + "' on '" + topic + "'");
            //     });
            // });

            // subscribe to a topic
            client.subscribe('/livingroom/bike', () => {
                client.on('message', async (topic, message) => {
                    // when a message arrives, do something with it
                    // console.log(bikeDataAggregated);
                    // console.log("Received '" + message + "' on '" + topic + "'");
                    const bikeData = JSON.parse(message.toString()) as BikeData;
                    this.bikeDataAggregated = await this.serviceBikeDataAggregate.aggregate(bikeData);
                    this.publish(client, this.bikeDataAggregated);
                });
            });

        });


        // client.on('message', function (topic, message) {
        //     // message is Buffer
        //     // console.log(JSON.parse(message.toString()) as BikeData);
        //
        //     // const bikeData = JSON.parse(message.toString()) as BikeData;
        //
        //     // client.end()
        // })

    }


}


