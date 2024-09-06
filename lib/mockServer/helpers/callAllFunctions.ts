export const callAllFunctions = <T extends Record<string, () => any>>(
  obj: T,
): { [K in keyof T]: ReturnType<T[K]> } => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value()]),
  ) as { [K in keyof T]: ReturnType<T[K]> };
};
