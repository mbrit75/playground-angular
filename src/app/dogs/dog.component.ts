import {Component, inject, signal} from "@angular/core";
import {DogStore} from "./dog.store";
import {DogService} from "./dog.service";
import {Dog} from "@app/dogs/dog.model";

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
})
export class DogComponent {

  // dependencies
  private readonly dogStore = inject(DogStore);
  private readonly dogService = inject(DogService);

  // state
  dogsSignal = this.dogStore.get<Dog[]>();

  ngOnInit() {
    this.dogService.requestDogs();

    setTimeout(() => {
      this.dogService.requestNewDogs();
    }, 5 * 1000);
  }

}
