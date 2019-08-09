import { RoutingExamplesModule } from './RoutingExamples.module';

describe('RoutingExamplesModule', () => {
	let module: RoutingExamplesModule;

  beforeEach(() => {
	  module = new RoutingExamplesModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
