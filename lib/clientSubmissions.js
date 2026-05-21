export const clientSubmissionsStorageKey = "asi:clientSubmissions";

export function getClientSubmissions() {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(clientSubmissionsStorageKey);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function saveClientSubmissions(submissions) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(clientSubmissionsStorageKey, JSON.stringify(submissions));
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

  saveClientSubmissions(nextSubmissions);
  return nextSubmission;
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
