import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { NinjaCat } from '@app/core/ninja-cats/models';
import { computed, inject } from '@angular/core';
import { NinjaCatService } from '../api';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

type NinjaCatState = {
  ninjaCats: NinjaCat[];
  isLoading: boolean;
  owner: {id: string, fullname: string, age: number, ninjaCatsId: number[]}; // todo si owner est null, on peut pas faire de signal
};

const initialState: NinjaCatState = {
  ninjaCats: [],
  owner: { id: "1", fullname: "Mob", age: 24, ninjaCatsId: [1, 2, 3]},
  isLoading: false,
};

export const NinjaCatStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({ ninjaCats }) => ({
    ninjaCatsCount: computed(() => ninjaCats().length),
    youngestNinjaCat: computed(() => {
      return ninjaCats().filter((ninjaCat) => ninjaCat.age === Math.min(...ninjaCats().map((ninjaCat) => ninjaCat.age)))[0];
    }),
  })),
  withProps(() => ({
    ninjaCatsService: inject(NinjaCatService),
  })),
  withMethods(({ninjaCatsService, ...store}) => ({
    //! === Reducers + Effects ===
    updateOwner(newOwner: {id: string, fullname: string, age: number, ninjaCatsId: number[]}): void {
      patchState(store, (state) => ({ owner:  newOwner } ));
    },
    updateNinjaCats(ninjaCat: NinjaCat): void {
      patchState(store, (state) => ({ ninjaCats: [ ...state.ninjaCats, ninjaCat ] }));
    },
    // loadNinjaCats(): void {
    //   patchState(store, () => ({ isLoading: true }));
    //   ninjaCatsService.requestCats().subscribe((ninjaCats) => {
    //     patchState(store, () => ({ ninjaCats, isLoading: false }));
    //   });
    // }
    loadNinjaCats: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
            return ninjaCatsService.getCats().pipe(
            tapResponse<NinjaCat[], unknown>({
              next: (ninjaCats: NinjaCat[]) => patchState(store, { ninjaCats, isLoading: false }),
              error: (err: unknown) => {
              patchState(store, { isLoading: false });
              console.error(err);
              },
            })
            );
        })
      )
    ),

  })),

);
