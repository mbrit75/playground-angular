import {Injectable, signal} from "@angular/core";
import { ModelWrapper } from "@app/shared";
import {GetMixin, SignalState, UpdateMixin} from "@app/shared/state";
import { Dog } from "./dog.model";


@Injectable({
  providedIn: 'root'
})
export class DogStore extends GetMixin(UpdateMixin(SignalState)) {
  constructor() {
    super();
    Object.values(DogSignals).forEach(key => {
      this.signalsState.set(key, signal<ModelWrapper<any>>({}));
    });
  }
}

export enum DogSignals {
  DOGS = 'dogs',
}
