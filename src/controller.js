export const STORAGE_KEY = 'dsh-vesna-theme.preference.v1';
export const SOURCE_ID = 'dsh-vesna-theme';

export function createController(theme, storage, overrides, artOverrides = overrides) {
  const listeners = new Set();
  let disposed = false;
  let release;
  let snapshot;
  let enabled = true;
  let wallpaper = true;
  let stickers = true;
  let storageState = 'saved';
  let readOnly = false;
  function read() {
    try {
      const raw = storage?.getItem(STORAGE_KEY);
      if (!storage) { storageState = 'unavailable'; return; }
      if (raw === null) return;
      let data;
      try { data = JSON.parse(raw); }
      catch { storageState = 'invalid'; enabled = false; return; }
      if (data?.version !== 1) { storageState = 'newer'; readOnly = true; enabled = false; return; }
      if (typeof data.enabled !== 'boolean') { storageState = 'invalid'; enabled = false; return; }
      enabled = data.enabled;
      wallpaper = typeof data.wallpaper === 'boolean' ? data.wallpaper : true;
      stickers = typeof data.stickers === 'boolean' ? data.stickers : true;
    } catch { storageState = 'unavailable'; }
  }
  function persist() {
    if (readOnly) return;
    try {
      if (!storage) throw new Error('storage unavailable');
      storage.setItem(STORAGE_KEY, JSON.stringify({ version:1, enabled, wallpaper, stickers }));
      storageState = 'saved';
    } catch { storageState = 'unavailable'; }
  }
  function publish() {
    if (disposed) return;
    const active = theme.getTheme();
    snapshot = Object.freeze({ enabled, wallpaper, stickers, storageState, preference:active.preference, scheme:active.active.colorScheme });
    for (const listener of listeners) listener();
  }
  function reconcile() {
    if (release) { const old = release; release = undefined; old(); }
    if (enabled) release = theme.overrideTokens(SOURCE_ID, wallpaper ? artOverrides : overrides);
    publish();
  }
  read();
  reconcile();
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    syncTheme: publish,
    syncStorage() {
      if (disposed) return;
      enabled = true; wallpaper = true; stickers = true; readOnly = false; storageState = 'saved';
      read(); reconcile();
    },
    choose(mode) {
      if (disposed) return;
      if (!['default','light','dark','system'].includes(mode)) throw new Error('Unknown appearance mode');
      // Native light/dark/system preferences stay under the Host's persistence.
      if (mode !== 'default') theme.setTheme(mode);
      enabled = mode !== 'default';
      persist(); reconcile();
    },
    setDecoration(name, value) {
      if (disposed) return;
      if (!['wallpaper', 'stickers'].includes(name) || typeof value !== 'boolean') throw new Error('Invalid decoration');
      if (name === 'wallpaper') wallpaper = value;
      else stickers = value;
      persist(); reconcile();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      release?.(); release = undefined; listeners.clear();
    }
  };
}
