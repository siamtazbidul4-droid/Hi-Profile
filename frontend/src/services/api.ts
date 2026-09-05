import {
  ProfileData,
  ProjectData,
  SkillData,
  ServiceData,
  TestimonialData,
  BlogPostData,
  ContactMessageData,
  SiteSettingData,
  AdminStats,
  DatabaseStatus,
  DbStatus,
  User,
} from '../types';

const API_BASE = '/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    const headers = new Headers(options.headers || {});

    if (options.body && !(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Send and receive HTTP-only cookies
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
      const error: any = new Error(errorMessage);
      error.status = response.status;
      error.details = data?.details;
      throw error;
    }

    return data;
  }

  // Database Diagnostic
  async getDbStatus(): Promise<{ success: boolean; data: DbStatus }> {
    return this.request<{ success: boolean; data: DbStatus }>('/db/status');
  }

  // Cloudinary Image Upload
  async uploadImage(
    file: File,
    folder: string = 'portfolio'
  ): Promise<{
    success: boolean;
    data: {
      url: string;
      public_id: string;
      format: string;
      width: number;
      height: number;
      bytes: number;
      original_filename: string;
    };
    message: string;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return this.request('/upload', {
      method: 'POST',
      body: formData,
    });
  }

  // Authentication
  async login(payload: { email: string; password: string }): Promise<{ success: boolean; user: User; token: string }> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async logout(): Promise<{ success: boolean }> {
    return this.request('/auth/logout', { method: 'POST' });
  }

  async getMe(): Promise<{ success: boolean; user: User }> {
    return this.request('/auth/me');
  }

  // Profile
  async getProfile(): Promise<{ success: boolean; data: ProfileData }> {
    return this.request('/profile');
  }

  async updateProfile(data: Partial<ProfileData>): Promise<{ success: boolean; data: ProfileData }> {
    return this.request('/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Projects
  async getProjects(params?: { category?: string; featured?: boolean; search?: string; includeUnpublished?: boolean }): Promise<{ success: boolean; data: ProjectData[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.featured) query.set('featured', 'true');
    if (params?.search) query.set('search', params.search);
    if (params?.includeUnpublished) query.set('includeUnpublished', 'true');

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/projects${qs}`);
  }

  async getProjectBySlug(slug: string): Promise<{ success: boolean; data: ProjectData; related: ProjectData[] }> {
    return this.request(`/projects/${slug}`);
  }

  async createProject(data: Partial<ProjectData>): Promise<{ success: boolean; data: ProjectData }> {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: Partial<ProjectData>): Promise<{ success: boolean; data: ProjectData }> {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string): Promise<{ success: boolean }> {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  // Skills
  async getSkills(params?: { category?: string; includeInactive?: boolean }): Promise<{ success: boolean; data: SkillData[] }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.includeInactive) query.set('includeInactive', 'true');

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/skills${qs}`);
  }

  async createSkill(data: Partial<SkillData>): Promise<{ success: boolean; data: SkillData }> {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSkill(id: string, data: Partial<SkillData>): Promise<{ success: boolean; data: SkillData }> {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSkill(id: string): Promise<{ success: boolean }> {
    return this.request(`/skills/${id}`, { method: 'DELETE' });
  }

  // Services
  async getServices(params?: { includeDrafts?: boolean }): Promise<{ success: boolean; data: ServiceData[] }> {
    const query = new URLSearchParams();
    if (params?.includeDrafts) query.set('includeDrafts', 'true');
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/services${qs}`);
  }

  async createService(data: Partial<ServiceData>): Promise<{ success: boolean; data: ServiceData }> {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: Partial<ServiceData>): Promise<{ success: boolean; data: ServiceData }> {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string): Promise<{ success: boolean }> {
    return this.request(`/services/${id}`, { method: 'DELETE' });
  }

  // Testimonials
  async getTestimonials(params?: { includeDrafts?: boolean; featured?: boolean }): Promise<{ success: boolean; data: TestimonialData[] }> {
    const query = new URLSearchParams();
    if (params?.includeDrafts) query.set('includeDrafts', 'true');
    if (params?.featured) query.set('featured', 'true');
    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/testimonials${qs}`);
  }

  async createTestimonial(data: Partial<TestimonialData>): Promise<{ success: boolean; data: TestimonialData }> {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: Partial<TestimonialData>): Promise<{ success: boolean; data: TestimonialData }> {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string): Promise<{ success: boolean }> {
    return this.request(`/testimonials/${id}`, { method: 'DELETE' });
  }

  // Blog
  async getBlogPosts(params?: { category?: string; tag?: string; search?: string; includeDrafts?: boolean; page?: number; limit?: number }): Promise<{
    success: boolean;
    data: BlogPostData[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
    meta: { categories: string[]; tags: string[] };
  }> {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.tag) query.set('tag', params.tag);
    if (params?.search) query.set('search', params.search);
    if (params?.includeDrafts) query.set('includeDrafts', 'true');
    if (params?.page) query.set('page', params.page.toString());
    if (params?.limit) query.set('limit', params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/blog${qs}`);
  }

  async getBlogPostBySlug(slug: string): Promise<{ success: boolean; data: BlogPostData; related: BlogPostData[] }> {
    return this.request(`/blog/${slug}`);
  }

  async createBlogPost(data: Partial<BlogPostData>): Promise<{ success: boolean; data: BlogPostData }> {
    return this.request('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: string, data: Partial<BlogPostData>): Promise<{ success: boolean; data: BlogPostData }> {
    return this.request(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlogPost(id: string): Promise<{ success: boolean }> {
    return this.request(`/blog/${id}`, { method: 'DELETE' });
  }

  // Contact
  async submitContact(data: { name: string; email: string; subject: string; message: string; projectBudget?: string; timeline?: string }): Promise<{ success: boolean; message: string }> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAdminMessages(params?: { isRead?: boolean; isArchived?: boolean }): Promise<{ success: boolean; data: ContactMessageData[] }> {
    const query = new URLSearchParams();
    if (params?.isRead !== undefined) query.set('isRead', String(params.isRead));
    if (params?.isArchived !== undefined) query.set('isArchived', String(params.isArchived));

    const qs = query.toString() ? `?${query.toString()}` : '';
    return this.request(`/contact/admin${qs}`);
  }

  async getContactMessages(params?: { isRead?: boolean; isArchived?: boolean }): Promise<{ success: boolean; data: ContactMessageData[] }> {
    return this.getAdminMessages(params);
  }

  async updateMessageStatus(id: string, data: { isRead?: boolean; isArchived?: boolean }): Promise<{ success: boolean; data: ContactMessageData }> {
    return this.request(`/contact/admin/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updateContactMessage(id: string, data: { isRead?: boolean; isArchived?: boolean }): Promise<{ success: boolean; data: ContactMessageData }> {
    return this.updateMessageStatus(id, data);
  }

  async deleteMessage(id: string): Promise<{ success: boolean }> {
    return this.request(`/contact/admin/${id}`, { method: 'DELETE' });
  }

  async deleteContactMessage(id: string): Promise<{ success: boolean }> {
    return this.deleteMessage(id);
  }

  // Settings
  async getSettings(): Promise<{ success: boolean; data: SiteSettingData }> {
    return this.request('/settings');
  }

  async updateSettings(data: Partial<SiteSettingData>): Promise<{ success: boolean; data: SiteSettingData }> {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Admin Stats
  async getAdminStats(): Promise<{ success: boolean; data: AdminStats }> {
    return this.request('/admin/stats');
  }
}

export const api = new ApiClient();
