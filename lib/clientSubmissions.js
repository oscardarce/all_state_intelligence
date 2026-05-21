export const clientSubmissionsStorageKey = "asi:clientSubmissions";

export function getClientSubmissions() {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(clientSubmissionsStorageKey);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

export function saveClientSubmissions(submissions) {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(clientSubmissionsStorageKey, JSON.stringify(submissions));
    return true;
  } catch {
    return false;
  }
}

export function addClientSubmission(submission) {
  const current = getClientSubmissions();
  const nextSubmission = {
    ...submission,
    id: `submission-${Date.now()}`,
    status: "Submitted for review",
    submittedAt: new Date().toISOString(),
  };
  const nextSubmissions = [nextSubmission, ...current];

  if (saveClientSubmissions(nextSubmissions)) return nextSubmission;

  const compactSubmission = {
    ...nextSubmission,
    storageWarning:
      "Photo previews were too large for browser storage. The submission was saved without persistent photo previews.",
    photos: (nextSubmission.photos || []).map(({ name, type, size }) => ({
      name,
      type,
      size,
      dataUrl: "",
    })),
  };

  saveClientSubmissions([compactSubmission, ...current]);
  return compactSubmission;
}

export function formatFileSize(bytes) {
  const size = Number(bytes) || 0;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}
