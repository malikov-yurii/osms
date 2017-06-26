import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class AutocompleteService {
  public focusMoved = new Subject();
  public selected = new Subject();
}
