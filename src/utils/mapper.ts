export const mapArrayToObject = (arr: string[], val: unknown) =>
  arr.map((v) => ({ [v]: val })).reduce((curr, acc) => ({ ...curr, ...acc }));
