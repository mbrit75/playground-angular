export interface ResourceState<T> {
  isLoading?: boolean;
  data?: T | undefined;
}
