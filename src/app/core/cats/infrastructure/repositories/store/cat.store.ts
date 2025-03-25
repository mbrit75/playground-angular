import {Injectable} from "@angular/core";
import {ResourceState} from "@app/core/shared/store/model";
import {BaseStore} from "../../../../shared/store/base";
import {Cat} from "@app/core/cats/models";


export enum CatSignals {
  CATS = 'CATS',
  SELECTED_CAT = 'SELECTED_CAT'
}

// Define the Data Interface (Strict Typing)
export interface CatSignalData {
  CATS: ResourceState<Cat[]>;           // 🔹 Type is enforced
  SELECTED_CAT: ResourceState<Cat | null>;  // 🔹 Type is enforced
}

@Injectable({
  providedIn: 'root'
})
export class CatStore extends BaseStore<typeof CatSignals, CatSignalData> {
  protected readonly storeEnum = CatSignals;
}
