import {signal, WritableSignal} from "@angular/core";
import {HasSignalState} from "@app/shared/state/signal-state.interface";
import {ModelWrapper} from "@app/shared";
import {DogSignals} from "@app/dogs/dog.store";

export class SignalState<T extends string | number> implements HasSignalState {
  signalsState = new Map<string, WritableSignal<ModelWrapper<any>>>();

  constructor() {
    this.initializeState(DogSignals);
  }

  private initializeState = (storeEnum: any) => {
    Object.values(DogSignals).forEach(key => {
      this.signalsState.set(key, signal<ModelWrapper<any>>({}));
    });
  };

}
