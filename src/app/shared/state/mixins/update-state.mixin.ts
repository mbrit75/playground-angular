import {Constructor} from "@app/shared/state/mixins/constructor.type";
import {ModelWrapper} from "@app/shared";
import {HasSignalState} from "@app/shared/state/signal-state.interface";

export function UpdateMixin<TBase extends Constructor<HasSignalState>>(Base: TBase) {
  return class extends Base {
      update(newState: ModelWrapper<any>) {
        this.signalState.update(state => ({ ...state, ...newState }));
      }
  };
}
