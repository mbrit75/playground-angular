import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NinjaCatStore } from '@app/core/ninja-cats/infrastructure/repositories/store';

@Component({
  selector: 'app-ninja-cat',
  imports: [CommonModule],
  templateUrl: './ninja-cat.component.html',
  styleUrl: './ninja-cat.component.css',
  standalone: true,
})
export class NinjaCatComponent {
  readonly ninjaCatStore = inject(NinjaCatStore);

  get ninjaCats() {
    return this.ninjaCatStore.ninjaCats();
  }
  get name() {
    return this.ninjaCatStore.ninjaCats()[0].name;
  }

  get isLoading() {
    return this.ninjaCatStore.isLoading();
  }

  get youngestNinjaCats() {
    return this.ninjaCatStore.youngestNinjaCat();
  }

  changeCatForOwner() {
    this.ninjaCatStore.updateOwner({id: "3", fullname: "toz", age: 5, ninjaCatsId: [1] });
      // this.ninjaCatStore.updateOwner('Mob');
  }


  // addNinjaCat(newNinjaCat: any) {
  //   this.ninjaCatStore.updateState((state) => ({
  //     ...state,
  //     ninjaCat: [...state.ninjaCat, newNinjaCat],
  //   }));
  // }
}
