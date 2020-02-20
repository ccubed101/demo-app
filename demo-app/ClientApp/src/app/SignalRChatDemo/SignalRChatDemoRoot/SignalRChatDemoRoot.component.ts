// The functionality of this component requires the installation of Microsoft's
// SignalR Typescript client package.  That can be achieved by executing the
// following at a command prompt:
//   npm install @microsoft/signalr

import { Component, OnInit, OnDestroy } from '@angular/core'
import * as SignalR from "@microsoft/signalr"
import { ChatService } from "./Chat.service"
import { ConnectionFactory } from "./ConnectionFactory"

@Component({
    selector: 'signalr-chat-demo',
	template: `
		<div class="title">
			SignalR Chat Demo
        </div>
        <div class="grid-container">
            <div class="leftMessagePanel">
                <div id="messages1" style="background-color: white; width: 100%; height: 500px">
                </div>
            </div>
            <div class="rightMessagePanel">
                <div id="messages2" style="background-color: white; width: 100%; height: 500px">
                </div>
            </div>
            <div class="leftSendPanel">
                <div>
                    <span style="width: calc(100% - 3.5em); float: left; display: table"><input id="message1" type="text" style="width: 100%; min-width: 100px" /></span>
                    <input id="send1" type="button" value="Send"  (click)="OnSend1()"/>
                </div>
            </div>
            <div class="rightSendPanel">
                 <div>
                    <span style="width: calc(100% - 3.5em); float: left; display: table"><input id="message2" type="text" style="width: 100%; min-width: 100px" /></span>
                    <input id="send2" type="button" value="Send" (click)="OnSend2()"/>
                </div>
           </div>
        </div>
	`,
	styles: [
		".title { text-align: center; font-size: xx-large; margin-top: 0.5em }",
        ".leftPanel { grid- area: leftMessagePanel; }",
        ".rightPanel { grid- area: rightMessagePanel; }",
        ".grid-container {                                  \
            display: grid;                                  \
            grid-template-areas:                            \
                'leftMessagePanel rightMessagePanel'        \
                'leftSendPanel rightSendPanel';             \
            grid-gap: 10px;                                 \
            background-color: #2196F3;                      \
            padding: 10px;                                  \
            margin-left: 10%;                               \
            margin-right: 10%;                              \
        }",
        ".grid-container > div {                            \
            background-color: rgba(255, 255, 255, 0.8);     \
            text-align: left;                               \
            padding: 1em;                                   \
            font-size: 16px;                                \
        }",
        ".grid-send {                                       \
            display: grid;                                  \
            grid-template-areas:                            \
                'message-input message-send';               \
        }",
    ],
    providers: [
        ConnectionFactory,
        ChatService,
    ]
})
export class SignalRChatDemoRootComponent implements OnInit, OnDestroy {

    // Construction.

    constructor(
        private chatService: ChatService,
    ) {
    }


    // Instance variables.

    messagesElem: HTMLDivElement[] = [];
    messageElem: HTMLInputElement[] = [];


    // Life cycle methods

    ngOnInit() {
        this.messagesElem[0] = document.querySelector("#messages1");
        this.messagesElem[1] = document.querySelector("#messages2");
        this.messageElem[0] = document.querySelector("#message1");
        this.messageElem[1] = document.querySelector("#message2");

        this.chatService.Setup(this.OnMessageReceived.bind(this));
    }

    ngOnDestroy() {
    }


    // Methods

    // Programmer's Note:  When using the "send" or "invoke" method to talk with the
    // server be aware that the types of the parameters must match the types of the
    // expected parameters as specified by the Hub at the server.  If a match cannot
    // be found then you will received an error similar to the following:
    //     Microsoft.AspNetCore.SignalR.HubException: Failed to invoke 'SendMessage' due to an error on the server.
    // Not that in the case of "invoke" the method name string parameter must match
    // the name of a Hub method on the server.

    OnSend1() {
        const username = new Date().toLocaleString();
        this.chatService.Send(0, username, this.messageElem[0].value)
            .then(() => this.messageElem[0].value = "");
    }

    OnSend2() {
        const username = new Date().toLocaleString();
        this.chatService.Send(1, username, this.messageElem[1].value)
            .then(() => this.messageElem[1].value = "");
    }

    OnMessageReceived(connectionIndex: number, username: string, message: string) {

        let m = document.createElement("div");

        m.innerHTML = `<div>${username}</div><div>${message}</div>`;

        this.messagesElem[connectionIndex].appendChild(m);
        this.messagesElem[connectionIndex].scrollTop = this.messagesElem[connectionIndex].scrollHeight;
    }


}


