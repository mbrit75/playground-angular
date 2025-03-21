import {inject, Injectable} from "@angular/core";
import {DogSignals, DogStore} from "@app/core/dogs/infrastructure/repositories/store/dog.store";
import {Dog} from "@app/core/dogs/models";

@Injectable({
  providedIn: 'root'
})
export class SelectDogUseCase {

  private readonly dogStore = inject(DogStore);
  private readonly selectDogSignal = DogSignals.SELECTED_DOG;

  getSignal() {
    return this.dogStore.get(this.selectDogSignal);
  }

  setSelectedDog(dog: Dog) {
    const { selectDogSignal } = this;
    this.dogStore.startLoading(selectDogSignal);

    this.dogStore.update(selectDogSignal, {
      isLoading: false,
      data: dog
    });
  }

}
