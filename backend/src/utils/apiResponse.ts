export function ok<T>(data: T, message = "OK") {
  return { success: true, message, data };
}

export function fail(message: string, details?: unknown) {
  return { success: false, error: { message, details } };
}
