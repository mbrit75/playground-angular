import {inject, Injectable} from "@angular/core";
import {Cat} from "@app/core/cats/models";
import {CatStore} from "@app/core/cats/infrastructure/repositories/store";
import {CatSignals} from "@app/core/cats/infrastructure/repositories/store/cat.store";

@Injectable({
  providedIn: 'root'
})
export class SelectCatUseCase {

  private readonly catStore = inject(CatStore);
  private readonly selectCatSignal = CatSignals.SELECTED_CAT;

  getSignal() {
    return this.catStore.get(this.selectCatSignal);
  }

  setSelectedCat(cat: Cat) {
    const { selectCatSignal } = this;
    this.catStore.startLoading(selectCatSignal);

    this.catStore.update(selectCatSignal, {
      isLoading: false,
      data: cat
    });
  }

}
