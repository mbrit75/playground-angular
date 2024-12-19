import {inject, Injectable} from "@angular/core";
import {Dog} from "./dog.model";
import {delay, of, take} from "rxjs";
import {DogStore} from "./dog.store";

@Injectable({
  providedIn: 'root'
})
export class DogService {

  // dependencies
  private readonly dogStore = inject(DogStore);

  // fake data
  private fakeDogs : Array<Dog> = [
    {
      id: 0,
      name: 'Fido',
      age: 3,
      breed: "chihuahua"
    },
    {
      id: 1,
      name: 'Spot',
      age: 2,
      breed: "cavalier king charles spaniel"
    },
    {
      id: 2,
      name: 'Rover',
      age: 5,
      breed: "rottweiler"
    }
  ];

  // public API
  requestDogs(fakeDogs?: Dog[]) {
    // this is just a fake example, use httpClient in real-world instead
    this.dogStore.update({isLoading: true});
    const dogs = fakeDogs ?? this.fakeDogs;

    of(dogs).pipe(delay(2000), take(1)).subscribe(dogs => {
      this.dogStore.update({ data: dogs, isLoading: false });
    });
  }

  requestNewDogs() {
    const dogs = [...this.fakeDogs.slice(), { id: 3, name: 'Lassie', age: 1, breed: "collie" }];
    this.requestDogs(dogs);
  }

}
