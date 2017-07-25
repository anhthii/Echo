export function loadQueueState() {
  try {
    const serializedQueueState = localStorage.getItem('queueState');
    if (!serializedQueueState) return undefined;

    return JSON.parse(serializedQueueState);
  } catch (err) {
    return undefined;
  }
}

export function saveQueueState(state) {
  try {
    const serializedQueueState = JSON.stringify(state.queueState);
    localStorage.setItem('queueState', serializedQueueState);
  } catch (err) {
    // ignore
  }
}

export function loadUserData() {
  try {
    const serializedUserData = localStorage.getItem('user');
    if (!serializedUserData) return undefined;

    return JSON.parse(serializedUserData);
  } catch (err) {
    return undefined;
  }
}
