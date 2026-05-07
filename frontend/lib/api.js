import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - attach access token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
            document.cookie = `learnify_role=${data.user.role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          }
          document.cookie = `learnify_token=${data.accessToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return api(original);
        } catch (_) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          document.cookie = 'learnify_role=; path=/; max-age=0; SameSite=Lax';
          document.cookie = 'learnify_token=; path=/; max-age=0; SameSite=Lax';
          window.location.href = '/login';
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        document.cookie = 'learnify_role=; path=/; max-age=0; SameSite=Lax';
        document.cookie = 'learnify_token=; path=/; max-age=0; SameSite=Lax';
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: (refreshToken) => api.post('/auth/logout', { refreshToken }),
  getMe: () => api.get('/auth/me'),
};

// Subjects API
export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getEnrolled: () => api.get('/subjects/enrolled'),
  enroll: (subjectId) => api.post('/subjects/enroll', { subjectId }),
  getSections: (subjectId) => api.get(`/subjects/${subjectId}/sections`),
  getInstructorDashboard: () => api.get('/subjects/instructor/dashboard'),
  create: (data) => api.post('/subjects', data),
  update: (subjectId, data) => api.put(`/subjects/${subjectId}`, data),
  remove: (subjectId) => api.delete(`/subjects/${subjectId}`),
  getStudents: (subjectId) => api.get(`/subjects/${subjectId}/students`),
  createSection: (subjectId, data) => api.post(`/subjects/${subjectId}/sections`, data),
  updateSection: (sectionId, data) => api.put(`/subjects/sections/${sectionId}`, data),
  removeSection: (sectionId) => api.delete(`/subjects/sections/${sectionId}`),
  createVideo: (sectionId, data) => api.post(`/subjects/sections/${sectionId}/videos`, data),
  updateVideo: (videoId, data) => api.put(`/subjects/videos/${videoId}`, data),
  removeVideo: (videoId) => api.delete(`/subjects/videos/${videoId}`),
};

// Videos API
export const videosAPI = {
  getVideo: (videoId) => api.get(`/videos/${videoId}`),
  updateProgress: (data) => api.post('/videos/progress', data),
  getNextVideo: (videoId) => api.get(`/videos/next?videoId=${videoId}`),
  getCourseProgress: (subjectId) => api.get(`/videos/course-progress/${subjectId}`),
};