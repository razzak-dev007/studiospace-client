import { Studio, Booking, User } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper for standard API requests
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Retrieve token from localStorage as fallback for environments blocking third-party cookies
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('studiospace_token');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Crucial for Challenge 1: HTTPOnly cookie transmission
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data?.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

// ---------------- AUTH API ----------------
export async function apiRegister(payload: { name: string; email: string; photoURL?: string; password: string }) {
  return fetchApi<{ success: boolean; message: string; userId: string }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiLogin(payload: { email: string; password: string }) {
  return fetchApi<{ success: boolean; message: string; token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiGoogleLogin(payload: { name: string; email: string; photoURL?: string }) {
  return fetchApi<{ success: boolean; message: string; token: string; user: User }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiGetMe() {
  return fetchApi<{ success: boolean; user: User }>('/auth/me', {
    method: 'GET',
  });
}

export async function apiLogout() {
  return fetchApi<{ success: boolean; message: string }>('/auth/logout', {
    method: 'POST',
  });
}

// ---------------- STUDIOS API ----------------
export async function apiGetStudios(params?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'All') query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.minPrice) query.append('minPrice', params.minPrice.toString());
  if (params?.maxPrice) query.append('maxPrice', params.maxPrice.toString());
  if (params?.sort) query.append('sort', params.sort);
  if (params?.limit) query.append('limit', params.limit.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return fetchApi<{ success: boolean; count: number; studios: Studio[] }>(`/studios${queryString}`);
}

export async function apiGetStudioById(id: string) {
  return fetchApi<{ success: boolean; studio: Studio }>(`/studios/${id}`);
}

export async function apiGetMyListings() {
  return fetchApi<{ success: boolean; count: number; listings: Studio[] }>('/studios/user/my-listings');
}

export async function apiCreateStudio(studioData: Partial<Studio>) {
  return fetchApi<{ success: boolean; message: string; studioId: string; studio: Studio }>('/studios', {
    method: 'POST',
    body: JSON.stringify(studioData),
  });
}

export async function apiUpdateStudio(id: string, studioData: Partial<Studio>) {
  return fetchApi<{ success: boolean; message: string; studio: Studio }>(`/studios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(studioData),
  });
}

export async function apiDeleteStudio(id: string) {
  return fetchApi<{ success: boolean; message: string }>(`/studios/${id}`, {
    method: 'DELETE',
  });
}

export async function apiGetCategoriesMeta() {
  return fetchApi<{
    success: boolean;
    categories: Array<{ name: string; value: string; icon: string; image: string; description: string; count: number }>;
  }>('/studios/categories/meta');
}

// ---------------- BOOKINGS API ----------------
export async function apiCreateBooking(payload: {
  studioId: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  creatorNotes?: string;
}) {
  return fetchApi<{ success: boolean; message: string; bookingId: string; booking: Booking }>('/bookings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiGetMyBookings() {
  return fetchApi<{ success: boolean; count: number; bookings: Booking[] }>('/bookings/my-bookings');
}

export async function apiGetBookingById(id: string) {
  return fetchApi<{ success: boolean; booking: Booking }>(`/bookings/${id}`);
}

export async function apiCancelBooking(id: string) {
  return fetchApi<{ success: boolean; message: string }>(`/bookings/${id}/cancel`, {
    method: 'PATCH',
  });
}

export async function apiUpdateBookingStatus(id: string, status: string) {
  return fetchApi<{ success: boolean; message: string }>(`/bookings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

// ---------------- WISHLIST API ----------------
export async function apiGetWishlist() {
  return fetchApi<{ success: boolean; studioIds: string[]; studios: Studio[] }>('/wishlist');
}

export async function apiToggleWishlist(studioId: string) {
  return fetchApi<{ success: boolean; saved: boolean; message: string }>('/wishlist/toggle', {
    method: 'POST',
    body: JSON.stringify({ studioId }),
  });
}
