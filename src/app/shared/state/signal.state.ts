import { signal, WritableSignal } from "@angular/core";
import { HasSignalState } from "@app/shared/state/signal-state.interface";
import { ModelWrapper } from "@app/shared";

export abstract class SignalState<TEnum extends { [key: string]: string | number}> implements HasSignalState  {
  signalsState = new Map<string | number, WritableSignal<ModelWrapper<any>>>();
  protected abstract storeEnum: TEnum;

  protected constructor() {
    this.initializeState();
  }

  private initializeState() {
    Object.values(this.storeEnum).forEach(key => {
      this.signalsState.set(key, signal<ModelWrapper<any>>({}));
    });
  }
}
