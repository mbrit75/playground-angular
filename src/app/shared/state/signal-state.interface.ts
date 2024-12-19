import {ModelWrapper} from "@app/shared";
import {WritableSignal} from "@angular/core";

export interface HasSignalState {
  signalState: WritableSignal<ModelWrapper<any>>;
}
