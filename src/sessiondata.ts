export interface SessionData {
  count: number;
}

export function createInitialSessionData() {
  return {
    count: 0,
  };
}
