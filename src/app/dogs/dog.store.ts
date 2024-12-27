import {Injectable} from "@angular/core";
import {createSignalState, GetMixin, UpdateMixin} from "@app/shared/state";


export enum DogSignals {
  DOGS = 'dogs',
}

const DogSignalState = createSignalState(DogSignals);

@Injectable({
  providedIn: 'root'
})
export class DogStore extends GetMixin(UpdateMixin(DogSignalState)) { }

