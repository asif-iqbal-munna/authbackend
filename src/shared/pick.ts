export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalObject: Partial<T> = {};
  keys.forEach(key => {
    if (key && Object.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];
    }
  });
  return finalObject;
};
