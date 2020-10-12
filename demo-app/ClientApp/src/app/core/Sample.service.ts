import { Injectable } from "@angular/core";
@Injectable()
export class SampleService {

  private str: string = "String from SampleService in src/app/core-module/Sample.service.ts";

  public get SampleString(): string {
    return this.str;
  }
  public set SampleString(s: string) {
    this.str = s;
  }

}

