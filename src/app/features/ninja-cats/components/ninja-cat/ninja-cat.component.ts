import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NinjaCatStore } from '@app/core/ninja-cats/infrastructure/repositories/store';

@Component({
  selector: 'app-ninja-cat',
  imports: [CommonModule],
  templateUrl: './ninja-cat.component.html',
  styleUrl: './ninja-cat.component.css',
  standalone: true,
})
export class NinjaCatComponent implements OnInit {

  readonly ninjaCatStore = inject(NinjaCatStore);

  get ninjaCats() {
    return this.ninjaCatStore.ninjaCats();
  }
  get name() {
    return this.ninjaCatStore.ninjaCats()[0].name;
  }

  get isLoading() {
    return this.ninjaCatStore?.isLoading();
  }

  get youngestNinjaCats() {
    return this.ninjaCatStore.youngestNinjaCat();
  }

  ngOnInit(): void {
    this.ninjaCatStore.loadNinjaCats();
  }

  changeOwner() {
    this.ninjaCatStore.updateOwner({id: "3", fullname: "toz", age: 5, ninjaCatsId: ["1"] });
  }
  changeNinjaCat() {
    this.ninjaCatStore.updateNinjaCat({ id: "1",
      name: 'Beru',
      age: 2,
      breed: 'Maine Coon',
      color: 'white',
      personality: 'curious',
      weapon: 'nunchaku', });
  }
}
