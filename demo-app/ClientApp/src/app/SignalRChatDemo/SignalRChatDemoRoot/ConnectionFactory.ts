import * as SignalR from "@microsoft/signalr";

export class ConnectionFactory {

    // Construction.

    constructor() {

        //this.connections.push(
        //    new SignalR.HubConnectionBuilder()
        //        .withUrl("http://localhost:9010/ChatHub")
        //        .configureLogging(SignalR.LogLevel.Information)
        //        .build()
        //);
        //this.connections.push(
        //    new SignalR.HubConnectionBuilder()
        //        .withUrl("http://localhost:9010/ChatHub")
        //        .configureLogging(SignalR.LogLevel.Information)
        //        .build()
        //);

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


    // Instance variables

    connections: SignalR.HubConnection[] = [];


    // Public properties.

    public get Connections(): SignalR.HubConnection[] {
        return this.connections;
    }
}
