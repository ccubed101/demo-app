import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRChatDemoRootComponent } from './SignalRChatDemoRoot.component'
import { ConnectionFactory } from './ConnectionFactory'
import { ChatService } from './Chat.service'

import { of } from 'rxjs';


describe('SignalRChatDemoRootComponent', () => {

    // Global definitions
    let component: SignalRChatDemoRootComponent;
    let fixture: ComponentFixture<SignalRChatDemoRootComponent>;

    beforeEach(async(() => {

        // Programmer Note: Setting up spies and stubs inside 'beforeEach' means they will be
        // newly created for each unit test.  They will only be created once if they are defined
        // above this 'beforeEach' at what amounts to global scope.

        let connectionFactorySpy = jasmine.createSpyObj('ConnectionFactory', ['Connections', 'test']);

        //let chatServiceSpy: any = jasmine.createSpyObj('ChatService', {
        //    'Send': new Promise<void>(function (resolve, reject) { resolve(null) }),
        //    'Setup': null,
        //});

        let chatServiceStub: Partial<ChatService> = {
            Send: (connectionIndex: number, username: string, message: string) => {
                return new Promise<void>(function (resolve, reject) { resolve() });
            },
            Setup: (OnMessageReceived: (connectionIndex: number, username: string, message: string) => void) => { },
        }

        TestBed.configureTestingModule({
            declarations: [
                SignalRChatDemoRootComponent,
            ],
            //providers: [
            //    { provide: ConnectionFactory, useValue: connectionFactorySpy },
            //    { provide: ChatService, useValue: chatServiceSpy }
            //]
        })
        // We have to use 'overrideComponent' because the component itself specifies the
        // 'providers' for 'ChatService' and 'ConnectionFactory' and as such they will be
        // used instead of the 'providers' specified in the TestBed configuration.
        .overrideComponent(SignalRChatDemoRootComponent, {
            set: {
                providers: [
                    { provide: ConnectionFactory, useValue: connectionFactorySpy },
                    //{ provide: ChatService, useValue: chatServiceSpy }
                    { provide: ChatService, useValue: chatServiceStub }
                ]
            }
        })
        .compileComponents().then(() => {
            fixture = TestBed.createComponent(SignalRChatDemoRootComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
        });

    }));

    // For some reason the command in the following beforeEach have to be executed here
    // and cannot be executed in the beforeEach above.  Also the command cannot be
    // executed within an async().
    //beforeEach(() => {
        //fixture = TestBed.createComponent(SignalRChatDemoRootComponent);
        //component = fixture.componentInstance;
        //fixture.detectChanges();
    //});

    it('should create an instance.', () => {
        expect(component).toBeTruthy();
    });

    it('should call ChatService.Send() when 1st "Send" button and 2nd \"Send\" button are pressed.', () => {

        // Use the following sequence of statements when using 'chatServiceSpy'.
        //let chatService: any = fixture.debugElement.injector.get(ChatService);
        //let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send1");
        //sendButton.click();
        //sendButton = fixture.nativeElement.querySelector("#send2");
        //sendButton.click();
        //expect(chatService.Send.calls.count()).toEqual(2);

        // Use the following sequence of statements when using 'chatServiceStub'.
        let chatService: any = fixture.debugElement.injector.get(ChatService);
        //-----------------
        // Use 1 of the following 3 statements (any of them will do):
        //spyOn(chatService, 'Send').and.callThrough();
        spyOn(chatService, 'Send').and.returnValue(new Promise<void>(function (resolve, reject) { resolve() }));
        //spyOn(chatService, 'Send').and.callFake((connectionIndex: number, username: string, message: string) => {
        //    return new Promise<void>(function (resolve, reject) { resolve() });
        //});
        //------------------
        let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send1");
        sendButton.click();
        sendButton = fixture.nativeElement.querySelector("#send2");
        sendButton.click();
        expect(chatService.Send.calls.count()).toEqual(2);
    })

    it('should call ChatService.Send() when 1st "Send" button is pressed.', () => {

        // Use the following sequence of statements when using 'chatServiceSpy'.
        //let chatService: any = fixture.debugElement.injector.get(ChatService);
        //let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send1");
        //sendButton.click();
        //expect(chatService.Send.calls.count()).toEqual(1);

        // Use the following sequence of statements when using 'chatServiceStub'.
        let chatService: any = fixture.debugElement.injector.get(ChatService);
        //-----------------
        // Use 1 of the following 3 statements (any of them will do):
        //spyOn(chatService, 'Send').and.callThrough();
        spyOn(chatService, 'Send').and.returnValue(new Promise<void>(function (resolve, reject) { resolve() }));
        //spyOn(chatService, 'Send').and.callFake((connectionIndex: number, username: string, message: string) => {
        //    return new Promise<void>(function (resolve, reject) { resolve() });
        //});
        //------------------
        let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send1");
        sendButton.click();
        expect(chatService.Send.calls.count()).toEqual(1);

    })

    it('should call ChatService.Send() when 2nd "Send" button is pressed.', () => {

        // Use the following sequence of statements when using 'chatServiceSpy'.
        //let chatService: any = fixture.debugElement.injector.get(ChatService);
        //let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send2");
        //sendButton.click();
        //expect(chatService.Send.calls.count()).toEqual(1);

        // Use the following sequence of statements when using 'chatServiceStub'.
        let chatService: any = fixture.debugElement.injector.get(ChatService);
        //-----------------
        // Use 1 of the following 3 statements (any of them will do):
        //spyOn(chatService, 'Send').and.callThrough();
        spyOn(chatService, 'Send').and.returnValue(new Promise<void>(function (resolve, reject) { resolve() }));
        //spyOn(chatService, 'Send').and.callFake((connectionIndex: number, username: string, message: string) => {
        //    return new Promise<void>(function (resolve, reject) { resolve() });
        //});
        //------------------
        let sendButton: HTMLElement = fixture.nativeElement.querySelector("#send2");
        sendButton.click();
        expect(chatService.Send.calls.count()).toEqual(1);

    })

    it('should display message content when message is received.', () => {

        let index: number = 0;
        const username: string = "Colin1";
        const message: string = "Message";

        component.OnMessageReceived(index, username, message);
        expect(component.messagesElem[index].childElementCount).toBe(1);
        expect(component.messagesElem[index].children[0].textContent).toBe(username + message);

        index = 1;
        component.OnMessageReceived(index, username, message);
        expect(component.messagesElem[index].childElementCount).toBe(1);
        expect(component.messagesElem[index].children[0].textContent).toBe(username + message);
   })
});
