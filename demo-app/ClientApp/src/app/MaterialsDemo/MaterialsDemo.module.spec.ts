import { MaterialsDemoModule } from './MaterialsDemo.module';

describe('MaterialsDemoModule', () => {
    let module: MaterialsDemoModule;

  beforeEach(() => {
      module = new MaterialsDemoModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
