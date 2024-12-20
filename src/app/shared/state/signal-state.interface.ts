import {ModelWrapper} from "@app/shared";
import {WritableSignal} from "@angular/core";

export interface HasSignalState {
  signalsState: Map<string, WritableSignal<ModelWrapper<any>>>;
  initializeState(storeEnum: any): void;
}
