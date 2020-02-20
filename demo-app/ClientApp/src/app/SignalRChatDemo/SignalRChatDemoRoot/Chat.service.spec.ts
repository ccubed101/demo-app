// For some reason the compiler cannot find the Jasmine stuff in this file.
// For example "describe" will have a red line beneath it.  If you hover the
// mouse over the line you get the following error message, "Cannot find
// name 'describe'."  Not sure why this is happening.  Interestingly when
// the tests are run the compiler does not have any problems and the tests
// run as expected.  One way to get rid of the red lines is as follows,
//
// import 'jasmine'
//
// While using this import gets rid of the red lines it causes lots of error
// output when the code for the test is compiled.  The error text begins with
// "ERROR in ./node_modules/fs.realpath/index.js".  A posting on GitHub
// indicated that the red lines could be eliminated by adding the following
// tsconfig.spec.ts file to the project,
//
// {
//    "compilerOptions": {
//        "types": [
//            "jasmine"
//        ]
//    }
// }
//
// This seemed to work.

// PROGRAMMER'S NOTE:  Calling .compileComponents(); without declaring any
// components will cause strange things to happen in other, completely
// unrelated, tests.  So don't do the following,
//
// TestBed.configureTestingModule({
//    providers: [
//        ChatService,
//        ConnectionFactory
//    ]
// }).compileComponents();



import { async, TestBed } from '@angular/core/testing'

import { ChatService } from './Chat.service'
import { ConnectionFactory } from './ConnectionFactory'

describe('ChatService', () => {

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            providers: [
                ChatService,
                ConnectionFactory
           ]
        });
    }));

    it('should have exactly 2 connections.', () => {
        const service: ChatService = TestBed.get(ChatService);
        expect(service.Connections.length).toBe(2);
    });

    it('should be created', () => {
        const service: ChatService = TestBed.get(ChatService);
        expect(service).toBeTruthy();
    });
});
