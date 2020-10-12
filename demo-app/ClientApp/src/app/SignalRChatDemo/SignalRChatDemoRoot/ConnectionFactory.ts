import * as SignalR from "@microsoft/signalr";

import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class ConnectionFactory {

    // Construction.

    constructor() {

        if (environment.production == true) {
            this.connections.push(
                new SignalR.HubConnectionBuilder()
                    .withUrl("http://localhost:9010/ChatHub")
                    .configureLogging(SignalR.LogLevel.Information)
                    .build()
            );
            this.connections.push(
                new SignalR.HubConnectionBuilder()
                    .withUrl("http://localhost:9010/ChatHub")
                    .configureLogging(SignalR.LogLevel.Information)
                    .build()
            );
        }

        else if (environment.production == false) {
            this.connections.push(
                new SignalR.HubConnectionBuilder()
                    .withUrl("https://localhost:44362/ChatHub")
                    .configureLogging(SignalR.LogLevel.Information)
                    .build()
            );
            this.connections.push(
                new SignalR.HubConnectionBuilder()
                    .withUrl("https://localhost:44362/ChatHub")
                    .configureLogging(SignalR.LogLevel.Information)
                    .build()
            );
        }
   }


    // Instance variables

    connections: SignalR.HubConnection[] = [];


    // Public properties.

    public get Connections(): SignalR.HubConnection[] {
        return this.connections;
    }
}
