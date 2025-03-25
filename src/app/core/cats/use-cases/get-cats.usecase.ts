import {inject, Injectable} from "@angular/core";
import {CatSignals, CatStore} from "@app/core/cats/infrastructure/repositories/store/cat.store";
import {CatService} from "@app/core/cats/infrastructure/repositories/api/cat.service";

@Injectable({
  providedIn: 'root',
})
export class GetCatsUseCase {

  private readonly catStore = inject(CatStore);
  private readonly catService = inject(CatService);
  private readonly getCatsSignal = CatSignals.CATS;

  getSignal() {
    return this.catStore.get(this.getCatsSignal);
  }

  loadCats() {
    const { getCatsSignal } = this;
    this.catStore.startLoading(getCatsSignal);

    this.catService.requestCats()
      .subscribe(cats => {
        this.catStore.update(getCatsSignal,
          {
            isLoading: false,
            data: cats
          })
      });
  }

  loadNewCats() {
    const { getCatsSignal } = this;
    this.catStore.startLoading(getCatsSignal);

    this.catService.requestNewCats()
      .subscribe(cats => {
        this.catStore.update(getCatsSignal,
          {
            isLoading: false,
            data: cats
          })
      });
  }

}
