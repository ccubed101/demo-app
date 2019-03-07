import { AnalyticsModule } from './analytics.module';

describe('AnalyticsModule', () => {
  let module: AnalyticsModule;

  beforeEach(() => {
	  module = new AnalyticsModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
