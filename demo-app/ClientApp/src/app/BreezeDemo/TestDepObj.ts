import { InjectionToken } from '@angular/core';

export interface ITestDepObj {
    name: string;
}

export let testDepObj: ITestDepObj = {
    name: "Object Name #1"
}

export const TEST_DEP_OBJ = new InjectionToken<ITestDepObj>('TestDepObj');
