import { VideosModule } from './Videos.module';

describe('VideosModule', () => {
  let module: VideosModule;

  beforeEach(() => {
	  module = new VideosModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
