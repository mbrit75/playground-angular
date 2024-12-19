import {signal} from "@angular/core";
import {HasSignalState} from "@app/shared/state/signal-state.interface";

export class SignalState implements HasSignalState {
  signalState = signal({});
}
