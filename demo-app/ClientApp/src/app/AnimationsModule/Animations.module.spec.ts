import { AnimationsModule } from './Animations.module';

describe('AnimationsModule', () => {
  let module: AnimationsModule;

  beforeEach(() => {
	  module = new AnimationsModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
