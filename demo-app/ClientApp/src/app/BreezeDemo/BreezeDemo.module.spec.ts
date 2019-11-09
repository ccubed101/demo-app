import { BreezeDemoModule } from './BreezeDemo.module';

describe('NgrxPlusBreeze module', () => {
    let module: BreezeDemoModule;

  beforeEach(() => {
      module = new BreezeDemoModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
