const drafts = new Map();

function clone(value) {
  if (value === undefined || value === null) return value;

  try {
    return structuredClone(value);
  } catch {
    return JSON.parse(JSON.stringify(value));
  }
}

export function getFormDraft(key, fallback) {
  if (!drafts.has(key)) return clone(fallback);
  return clone(drafts.get(key));
}

export function setFormDraft(key, value) {
  drafts.set(key, clone(value));
}

export function clearFormDraft(key) {
  drafts.delete(key);
}
