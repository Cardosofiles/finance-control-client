declare module "regression" {
  export type DataPoint = [number, number];
  export function linear(data: DataPoint[]): {
    points: DataPoint[];
    predict: (x: number) => DataPoint;
  };
}
