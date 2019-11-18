import { NgrxDemoModule } from './NgrxDemo.module';

describe('NgrxDemo module', () => {
    let module: NgrxDemoModule;

  beforeEach(() => {
      module = new NgrxDemoModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
