import { TheRevenueProjectModule } from './TheRevenueProject.module';

describe('TheRevenueProject module', () => {
    let module: TheRevenueProjectModule;

  beforeEach(() => {
      module = new TheRevenueProjectModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
