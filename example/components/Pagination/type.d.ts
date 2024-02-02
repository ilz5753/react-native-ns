export interface IPaginationStep {
  id: string;
  title: string;
}
export type TPaginationStep = Omit<IPaginationStep, "id"> & {
  isDone?: boolean;
};
export interface IPagination {
  steps: IPaginationStep[];
  activeIndex?: number;
  // prev(): void;
  // next(): void;
  // jump(to: number): void;
}
