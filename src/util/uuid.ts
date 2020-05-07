export function uuid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).substr(2, 32)}`;
}
