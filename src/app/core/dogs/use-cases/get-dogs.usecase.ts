import {inject, Injectable} from "@angular/core";
import {DogSignals, DogStore} from "@app/core/dogs/infrastructure/repositories/store/dog.store";
import {DogService} from "@app/core/dogs/infrastructure/repositories/api/dog.service";

@Injectable({
  providedIn: 'root',
})
export class GetDogsUseCase {

  private readonly dogStore = inject(DogStore);
  private readonly dogService = inject(DogService);
  private readonly getDogsSignal = DogSignals.DOGS;

  getSignal() {
    return this.dogStore.get(this.getDogsSignal);
  }

  loadDogs() {
    const { getDogsSignal } = this;
    this.dogStore.startLoading(getDogsSignal);

    this.dogService.requestDogs()
      .subscribe(dogs => {
        this.dogStore.update(getDogsSignal,
          {
            isLoading: false,
            data: dogs
          })
      });
  }

  loadNewDogs() {
    const { getDogsSignal } = this;
    this.dogStore.startLoading(getDogsSignal);

    this.dogService.requestNewDogs()
      .subscribe(dogs => {
        this.dogStore.update(getDogsSignal,
          {
            isLoading: false,
            data: dogs
          })
      });
  }


}
