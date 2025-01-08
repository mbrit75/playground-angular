import {Component, inject } from "@angular/core";
import {DogSignals, DogStore} from "../dog.store";
import {DogService} from "../dog.service";
import {Dog} from "@app/dogs/models/dog.model";

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  // dependencies
  private readonly dogStore = inject(DogStore);
  private readonly dogService = inject(DogService);

  // state
  dogsSignal = this.dogStore.get<Dog[]>(DogSignals.DOGS);

  ngOnInit() {
    this.dogService.requestDogs();

    setTimeout(() => {
      this.dogService.requestNewDogs();
    }, 5 * 1000);
  }

}
