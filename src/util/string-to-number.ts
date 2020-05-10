export function stringToNumber(str: string): number {
  const numberStr = str.replace(/\D/g, "");
  return numberStr ? parseInt(numberStr, 10) : 0;
}
