export interface IStore {
  state: any;
  update(state?: any): void;
}
