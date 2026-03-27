export interface Property {
  id: number;
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  tag?: string;
}

export interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  destinations: Array<{
    id: number;
    image: string;
    city: string;
    country: string;
    count: number;
  }>;
  featuredProperties: Property[];
  articles: Array<{
    id: number;
    image: string;
    title: string;
    date: string;
    readTime: string;
  }>;
  partners: string[];
}

export interface PropertyListResponse {
  list: Property[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  filters: {
    subNavs: string[];
    propertyTypes: string[];
    amenities: string[];
  };
}

export interface PropertyDetailResponse {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  tag: string;
  photos: string[];
  description: string[];
  amenities: string[];
  host: {
    id: number;
    name: string;
    avatar: string;
    intro: string;
    rating: number;
    verified: boolean;
  };
  reviews: Array<{
    id: number;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    text: string;
  }>;
  nearby: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
  similar: Property[];
}

export interface WishlistResponse {
  tabs: string[];
  stays: Property[];
  experiences: Property[];
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

export interface Message {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface CheckoutPayload {
  name: string;
  phone: string;
  email: string;
  paymentMethod: 'card' | 'wechat' | 'alipay';
  propertyId?: number;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface Order {
  orderId: string;
  status: string;
  property: {
    id: number;
    title: string;
    location: string;
    image: string;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  breakdown: {
    roomTotal: number;
    serviceFee: number;
    cleaningFee: number;
    total: number;
  };
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  paymentMethod: string;
  createdAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({ message: '请求失败' }))) as {
      message?: string;
    };
    throw new Error(payload.message || '请求失败');
  }

  return (await response.json()) as T;
}

export function getHomeData() {
  return request<HomeData>('/api/home');
}

export function getProperties(params: {
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
  pageSize?: number;
  propertyType?: string[];
  amenities?: string[];
}) {
  const query = new URLSearchParams();
  if (typeof params.minPrice === 'number') query.set('minPrice', String(params.minPrice));
  if (typeof params.maxPrice === 'number') query.set('maxPrice', String(params.maxPrice));
  if (typeof params.minRating === 'number') query.set('minRating', String(params.minRating));
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.page) query.set('page', String(params.page));
  if (params.pageSize) query.set('pageSize', String(params.pageSize));
  if (params.propertyType?.length) query.set('propertyType', params.propertyType.join(','));
  if (params.amenities?.length) query.set('amenities', params.amenities.join(','));

  const queryString = query.toString();
  return request<PropertyListResponse>(`/api/properties${queryString ? `?${queryString}` : ''}`);
}

export function getPropertyDetail(id: string) {
  return request<PropertyDetailResponse>(`/api/properties/${id}`);
}

export function getWishlist() {
  return request<WishlistResponse>('/api/wishlist');
}

export function toggleWishlist(propertyId: number) {
  return request<{ success: boolean; wishlist: number[] }>('/api/wishlist/toggle', {
    method: 'POST',
    body: JSON.stringify({ propertyId }),
  });
}

export function getConversations() {
  return request<Conversation[]>('/api/messages/conversations');
}

export function getConversationMessages(conversationId: number) {
  return request<Message[]>(`/api/messages/${conversationId}`);
}

export function sendMessage(conversationId: number, text: string) {
  return request<Message>(`/api/messages/${conversationId}`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

export function createCheckoutOrder(payload: CheckoutPayload) {
  return request<Order>('/api/checkout', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getOrder(orderId: string) {
  return request<Order>(`/api/orders/${orderId}`);
}
