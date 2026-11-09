export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}
export function setToken(token) {
  if (typeof window !== "undefined") localStorage.setItem("accessToken", token);
}
export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem("accessToken");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (res.status === 401 && !options._retry) {
    try {
      const r = await fetch(`${API_BASE}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });
      if (r.ok) {
        const j = await r.json();
        const newToken = j?.data?.accessToken || j?.accessToken;
        if (newToken) {
          setToken(newToken);
          return request(path, { ...options, _retry: true });
        }
      }
    } catch {}
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Request failed: ${res.status}`);
  }
  const json = await res.json().catch(() => null);
  return json?.data ?? json;
}

export const api = {
  // auth
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  refresh: () => request("/auth/refresh-token", { method: "POST" }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
  changePassword: (payload) => request("/auth/change-password", { method: "PATCH", body: JSON.stringify(payload) }),

  // projects
  getProjects: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    return request(`/projects${params ? `?${params}` : ""}`);
  },
  getProject: (slug) => request(`/projects/${slug}`),
  createProject: (payload) => request("/projects", { method: "POST", body: JSON.stringify(payload) }),
  updateProject: (id, payload) => request(`/projects/${id}`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),

  // contacts
  submitContact: (payload) => request("/contacts", { method: "POST", body: JSON.stringify(payload) }),
  getContacts: () => request("/contacts"),
  markContactRead: (id) => request(`/contacts/${id}/read`, { method: "PATCH" }),
  deleteContact: (id) => request(`/contacts/${id}`, { method: "DELETE" }),

  // upload
  uploadImages: (files) => {
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("images", f));
    return request("/upload", { method: "POST", body: fd });
  },
  deleteImage: (publicId) => request(`/upload/${encodeURIComponent(publicId)}`, { method: "DELETE" }),
};

export default api;