import {SignalState} from "@app/shared/state/signal.state";

export function createSignalState<TEnum extends { [key: string]: string | number }>(enumType: TEnum){
  return class extends SignalState<TEnum> {
    protected get storeEnum(): TEnum {
      return enumType;
    }

    constructor() {
      super();
    }
  };
}
