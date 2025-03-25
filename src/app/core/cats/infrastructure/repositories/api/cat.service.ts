import { Injectable} from "@angular/core";
import { delay, of, take } from "rxjs";
import { Cat } from "@app/core/cats/models";

@Injectable({
  providedIn: 'root'
})
export class CatService {

  // fake data
  private fakeCats : Array<Cat> = [
    {
      id: 0,
      name: 'Whiskers',
      age: 3,
      breed: "Siamese"
    },
    {
      id: 1,
      name: 'Mittens',
      age: 2,
      breed: "Persian"
    },
    {
      id: 2,
      name: 'Felix',
      age: 5,
      breed: "Maine Coon"
    }
  ];

  // public API
  requestCats(fakeCats?: Cat[]) {
    const cats = fakeCats ?? this.fakeCats;

    return of(cats).pipe(delay(2000), take(1));
  }

  requestNewCats() {
    const cats = [...this.fakeCats.slice(), {id: 3, name: 'Luna', age: 1, breed: "Bengal"}];
    return this.requestCats(cats);
  }

}
