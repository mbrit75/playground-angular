import {Injectable} from "@angular/core";
import {GetMixin, SignalState, UpdateMixin} from "@app/shared/state";


@Injectable({
  providedIn: 'root'
})
export class DogStore extends GetMixin(UpdateMixin(SignalState)) {}

