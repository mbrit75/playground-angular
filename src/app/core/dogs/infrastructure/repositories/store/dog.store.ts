import {Injectable} from "@angular/core";
import {ResourceState} from "@app/core/shared/store/model";
import {BaseStore} from "../../../../shared/store/base";
import {Dog} from "@app/core/dogs/models";


export enum DogSignals {
  DOGS = 'DOGS',
  SELECTED_DOG = 'SELECTED_DOG'
}

// Define the Data Interface (Strict Typing)
export interface DogSignalData {
  DOGS: ResourceState<Dog[]>;           // 🔹 Type is enforced
  SELECTED_DOG: ResourceState<Dog | null>;  // 🔹 Type is enforced
}

@Injectable({
  providedIn: 'root'
})
export class DogStore extends BaseStore<typeof DogSignals, DogSignalData> {
  protected readonly storeEnum = DogSignals;
}
