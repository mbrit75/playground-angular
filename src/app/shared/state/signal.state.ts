import {WritableSignal} from "@angular/core";
import {HasSignalState} from "@app/shared/state/signal-state.interface";
import {ModelWrapper} from "@app/shared";

export class SignalState implements HasSignalState {
  signalsState = new Map<string, WritableSignal<ModelWrapper<any>>>();
}
