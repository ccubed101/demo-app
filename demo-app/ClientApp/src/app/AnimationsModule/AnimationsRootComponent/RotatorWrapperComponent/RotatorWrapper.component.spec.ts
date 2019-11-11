import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RotatorWrapperComponent } from './RotatorWrapper.component'
import { ThickFrame3DComponent } from '../ThickFrame3DComponent/ThickFrame3D.component'
import { RotatorComponent } from '../RotatorComponent/Rotator.component'


// THIS UNIT TEST IS DISABLED.  For some reason running this test, or any of the similar
// tests for the components in the BreezeDemo module, causes very strange things to happen.
// Specifically errors start to occur in test in completely different modules which causes
// the unit testing operation to fail.  Until the cause can be discerned these test must
// not be run.
// One possible explanation is that Karma and Jasmine are fine if the unit tests for
// components are in the startup module (e.g. app or main).  But in other module problems arise.
describe('RotatorWrapperComponent', () => {
    let component: RotatorWrapperComponent;
    let fixture: ComponentFixture<RotatorWrapperComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                RotatorWrapperComponent,
                ThickFrame3DComponent,
                RotatorComponent
            ],
            imports: [
                BrowserAnimationsModule
            ],
            providers: [
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RotatorWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create an instance.', () => {
        expect(component).toBeTruthy();
    });
});

