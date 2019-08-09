import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// A route resolver allows you to get data before navigating to a new route.

@Injectable()
export class SampleResolverService implements Resolve<Observable<string>> {
  constructor() { }

  resolve() {
    return of('String from SampleResolverService in src/app/core-module/resolvers/sample-resolver.service.ts.');
  }
}
