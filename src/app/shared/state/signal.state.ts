import {signal, WritableSignal} from "@angular/core";
import {HasSignalState} from "@app/shared/state/signal-state.interface";
import {ModelWrapper} from "@app/shared";
import {DogSignals} from "@app/dogs/dog.store";

export class SignalState implements HasSignalState {
  signalsState = new Map<string, WritableSignal<ModelWrapper<any>>>();

  initializeState = (storeEnum: any) => {
    Object.values(DogSignals).forEach(key => {
      this.signalsState.set(key, signal<ModelWrapper<any>>({}));
    });
  };

}
