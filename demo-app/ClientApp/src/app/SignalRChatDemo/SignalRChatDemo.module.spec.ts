import { SignalRChatDemoModule } from './SignalRChatDemo.module';

describe('SignalRChatDemo module', () => {
    let module: SignalRChatDemoModule;

  beforeEach(() => {
      module = new SignalRChatDemoModule();
  });

  it('should create an instance', () => {
    expect(module).toBeTruthy();
  });
});
