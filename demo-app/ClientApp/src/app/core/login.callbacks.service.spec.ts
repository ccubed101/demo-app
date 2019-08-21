import { TestBed } from '@angular/core/testing';

import { LoginCallbacksService } from './login.callbacks.service';

describe('Login.Callbacks.Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCallbacksService = TestBed.get(LoginCallbacksService);
    expect(service).toBeTruthy();
  });
});
