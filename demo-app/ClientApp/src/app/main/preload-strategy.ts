import { Routes, Route, RouterModule, PreloadingStrategy } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable()
export class PreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
    return route.data && route.data.preload ? load() : of(null);
  }
}
