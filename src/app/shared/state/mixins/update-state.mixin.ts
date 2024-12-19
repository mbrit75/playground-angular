import {Constructor} from "@app/shared/state/mixins/constructor.type";
import {ModelWrapper} from "@app/shared";
import {HasSignalState} from "@app/shared/state/signal-state.interface";

export function UpdateMixin<TBase extends Constructor<HasSignalState>>(Base: TBase) {
  return class extends Base {
      update(key: string, newState: ModelWrapper<any>) {
        this.signalsState.get(key)?.update(state => ({ ...state, ...newState }));
        console.log(key);
        console.log(this.signalsState);
      }
  };
}
