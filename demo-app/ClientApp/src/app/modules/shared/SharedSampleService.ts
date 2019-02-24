export class SharedSampleService {

  private str: string = "Shared Sample Service";

  public get SampleString(): string {
    return this.str;
  }
  public set SampleString(s: string) {
    this.str = s;
  }

}
