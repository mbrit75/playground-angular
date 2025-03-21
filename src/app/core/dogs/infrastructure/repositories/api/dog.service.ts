import { Injectable} from "@angular/core";
import { delay, of, take } from "rxjs";
import {Dog} from "@app/core/dogs/models";

@Injectable({
  providedIn: 'root'
})
export class DogService {

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
    const dogs = fakeDogs ?? this.fakeDogs;

    return of(dogs).pipe(delay(2000), take(1));
  }

  requestNewDogs() {
    const dogs = [...this.fakeDogs.slice(), {id: 3, name: 'Lassie', age: 1, breed: "collie"}];
    return this.requestDogs(dogs);
  }

}
