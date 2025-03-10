export interface BaseUseCase<T, Params> {
  execute(params: Params): Promise<T>;
}
s;
