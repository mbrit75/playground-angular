import {ModelWrapper} from "@app/shared";
import {WritableSignal} from "@angular/core";

export interface HasSignalState {
  signalsState: Map<string | number, WritableSignal<ModelWrapper<any>>>;
}
