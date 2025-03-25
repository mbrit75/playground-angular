import { Injectable, signal, WritableSignal } from "@angular/core";
import { ResourceState } from "@app/core/shared/store/model";

@Injectable({
  providedIn: 'root',
})
export abstract class BaseStore<
  TEnum extends Record<string, string | number>,
  TData extends { [K in keyof TEnum]: ResourceState<any> }
> {
  private readonly signalsState = new Map<keyof TEnum, WritableSignal<TData[keyof TEnum]>>();

  // Each derived class must define this property
  protected abstract readonly storeEnum: TEnum;

  protected constructor() {
    this.initializeState();
  }

  private initializeState(): void {
    Object.keys(this.storeEnum).forEach((key) => {
      const typedKey = key as keyof TEnum;
      this.signalsState.set(typedKey, signal<TData[typeof typedKey]>({ data: null, isLoading: false} as any));
    });
  }

  get<K extends keyof TData>(key: K): WritableSignal<TData[K]> {
    return this.signalsState.get(<string>key) as WritableSignal<TData[K]>;
  }

  update<K extends keyof TData>(key: K, newState: Partial<TData[K]>): void {
    const signal = this.signalsState.get(<string>key);
    if (!signal) {
      return;
    }
    // @ts-ignore
    signal.update((state): TData[K] => ({
      ...state,
      ...newState
    }));
  }

  startLoading<K extends keyof TData>(key: K): void {
    const signal = this.signalsState.get(<string>key);
    if (!signal) {
      return;
    }

    // @ts-ignore
    signal.update((state): TData[K] => ({
      ...state,
      isLoading: true
    }));
  }
}
