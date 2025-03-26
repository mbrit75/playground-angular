import { Injectable} from "@angular/core";
import { delay, of, take } from "rxjs";
import { Cat } from "@app/core/cats/models";
import { NinjaCat } from "@app/core/ninja-cats/models";

@Injectable({
  providedIn: 'root'
})
export class NinjaCatService {
  ninjaCats = [{
    id: "1",
    name: 'Leo',
    age: 11,
    breed: 'Siamese',
    color: 'black',
    personality: 'playful',
    weapon: 'katana',
  },
  {
    id: "2",
    name: 'Neo',
    age: 20,
    breed: 'Bengal',
    color: 'white',
    personality: 'chill',
    weapon: 'ninja stars',
  },
  {
    id: "3",
    name: 'Meo',
    age: 3,
    breed: 'Persian',
    color: 'orange',
    personality: 'curious',
    weapon: 'bo staff',
  }];

  getCats(ninjaCats?: NinjaCat[]) {
    const cats = ninjaCats ?? this.ninjaCats;

    return of(cats).pipe(delay(2000), take(1));
  }

}
