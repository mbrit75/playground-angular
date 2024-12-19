import {Injectable, signal} from "@angular/core";
import {Dog} from "./dog.model";
import {ModelWrapper} from "@app/shared";

@Injectable({
  providedIn: 'root'
})
export class DogStore {

  private dogsSignal = signal<ModelWrapper<Dog[]>>({});

  set(dogsWrapper: ModelWrapper<Dog[]>) {
    this.dogsSignal.set(dogsWrapper);
  }

  update(dogsWrapper: ModelWrapper<Dog[]>) {
    this.dogsSignal.update(d => ({...d, ...dogsWrapper}));
  }

  get() {
    return this.dogsSignal;
  }

}
