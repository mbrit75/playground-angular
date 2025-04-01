import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { NinjaCat } from '@app/core/ninja-cats/models';
import { computed, inject } from '@angular/core';
import { NinjaCatService } from '../api';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
type Owner = {id: string, fullname: string, age: number, ninjaCatsId: string[]};
type NinjaCatState = {
  ninjaCats: NinjaCat[];
  isLoading: boolean;
  owner: Owner; // TODO si owner est null, on peut pas faire de signal
};

const initialState: NinjaCatState = {
  ninjaCats: [],
  owner: { id: "1", fullname: "Mob", age: 24, ninjaCatsId: ["1", "2", "3"]},
  isLoading: false,
};

export const NinjaCatStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({ ninjaCats, owner }) => ({
    ninjaCatsCount: computed(() => ninjaCats().length),
    youngestNinjaCat: computed(() => {
      return ninjaCats().filter((ninjaCat) => ninjaCat.age === Math.min(...ninjaCats().map((ninjaCat) => ninjaCat.age)))[0];
    }),
    ninjaCatsNamesForOwner: computed(() => {
      return ninjaCats().filter((ninjaCat) => owner().ninjaCatsId.includes(ninjaCat.id));
    }),
  })),
  withProps(() => ({
    ninjaCatsService: inject(NinjaCatService),
  })),
  withMethods(({ninjaCatsService, ...store}) => ({
    updateOwner(newOwner: {id: string, fullname: string, age: number, ninjaCatsId: string[]}): void {
     console.log('updateOwner', newOwner);
      patchState(store, (_state) => ({ owner:  newOwner } ));
    },
    updateNinjaCat(ninjaCat: NinjaCat): void {
      patchState(store, (state) => {
        const index = state.ninjaCats.findIndex((cat) => cat.id === ninjaCat.id);
        if (index !== -1) {
          state.ninjaCats[index] = { ...state.ninjaCats[index], ...ninjaCat };
        }
        return { ninjaCats: [ ...state.ninjaCats ] }
      });
    },
    loadNinjaCats: rxMethod<void>(
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
    deleteNinjaCat(id: string): void {
      patchState(store, (state) => {
        const index = state.ninjaCats.findIndex((cat) => cat.id === id);
        if (index !== -1) {
          state.ninjaCats.splice(index, 1);
        }
        return { ninjaCats: [ ...state.ninjaCats ] }
      });
    }
  })),

);
