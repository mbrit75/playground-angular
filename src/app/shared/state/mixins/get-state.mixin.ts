import {Constructor} from "@app/shared/state/mixins/constructor.type";
import {HasSignalState} from "@app/shared/state/signal-state.interface";
import {ModelWrapper} from "@app/shared";
import {WritableSignal} from "@angular/core";

export function GetMixin<TBase extends Constructor<HasSignalState>>(Base: TBase) {
  return class extends Base {
    get<T>() {
      return this.signalState as WritableSignal<ModelWrapper<T>>;
    }
  };
}
