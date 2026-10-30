export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  photoURL?: string;
  role: 'creator' | 'host' | 'admin';
}

export type StudioCategory = 
  | 'Photo Studio'
  | 'Film Stage'
  | 'Podcast Lounge'
  | 'Music Suite'
  | 'Art Workshop'
  | 'Dance Studio';

export interface Studio {
  _id: string;
  title: string;
  category: StudioCategory;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  gallery: string[];
  amenities: string[];
  overview: string;
  ownerEmail: string;
  ownerName: string;
  ownerPhoto?: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioCategory: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
  securityDeposit: number;
  userEmail: string;
  userName: string;
  bookingDate: string; // YYYY-MM-DD
  startTime: string;   // HH:mm
  endTime: string;     // HH:mm
  durationHours: number;
  totalPrice: number;
  creatorNotes?: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}
