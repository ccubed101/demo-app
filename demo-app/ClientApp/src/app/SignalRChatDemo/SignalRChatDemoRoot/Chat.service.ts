import { ConnectionFactory } from "../SignalRChatDemoRoot/ConnectionFactory"

import * as SignalR from "@microsoft/signalr"



export class ChatService {

    // Construction.

    constructor(
        private connectionFactory: ConnectionFactory
    ) {
    }


    // Instance variables

    onMessageReceived: (connectionIndex: number, username: string, message: string) => void;


    // Property accessors.

    get Connections(): SignalR.HubConnection[] {
        return this.connectionFactory.Connections;
    }

    get OnMessageReceived(): (connectionIndex: number, username: string, message: string) => void {
        return this.onMessageReceived;
    }
    set OnMessageReceived(value: (connectionIndex: number, username: string, message: string) => void) {
        this.onMessageReceived = value;
    }


    // Public methods.

    Setup(): void {

        for (var i: number = 0; i < this.Connections.length; ++i) {

            let connection: SignalR.HubConnection = this.Connections[i];

            let index = Number(i.toString());
            connection.on("BroadcastMessage", (username: string, message: string) => {
                
                this.onMessageReceived(index, username, message);
            });

            connection.start().then(() => console.log("Connected " + connection.connectionId.toString())).catch(err => console.log(err));
        }
    }

    Send(connectionIndex: number, username: string, message: string): Promise<void> {
        return this.Connections[connectionIndex].send("SendMessage", username, message);
    }
}
