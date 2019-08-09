import { FormsDemoModule } from './forms-demo.module';

describe('FormsDemoModule', () => {
  let module: FormsDemoModule;

  beforeEach(() => {
    module = new FormsDemoModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
