import {Component, effect, inject, Signal} from "@angular/core";
import {ResourceState} from "@app/core/shared/store/model";
import {GetDogsUseCase, SelectDogUseCase} from "@app/core/dogs/use-cases";
import {NgClass} from "@angular/common";
import {Dog} from "@app/core/dogs/models";

@Component({
  selector: 'app-dog',
  templateUrl: './dog.component.html',
  imports: [
    NgClass
  ],
  styleUrls: ['./dog.component.css']
})
export class DogComponent {

  // dependencies
  private getDogsUseCase = inject(GetDogsUseCase);
  private selectDogsUseCase = inject(SelectDogUseCase);

  // state
  getDogsSignal!: Signal<ResourceState<Dog[]>>;
  selectedDogSignal!: Signal<ResourceState<Dog | null>>;

  constructor() {
    this.getDogsSignal = this.getDogsUseCase.getSignal();
    this.selectedDogSignal = this.selectDogsUseCase.getSignal();
  }

  ngOnInit() {
     this.getDogsUseCase.loadDogs();

    setTimeout(() => {
      this.getDogsUseCase.loadNewDogs()
    }, 5 * 1000);
  }

  onCardClick(event: MouseEvent, dog: Dog) {
    event.stopPropagation();
    event.preventDefault();

    this.selectDogsUseCase.setSelectedDog(dog);
  }
}
