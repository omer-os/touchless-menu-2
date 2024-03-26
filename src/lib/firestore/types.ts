export interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  menu?: Menu[];
  location?: string;
  phone?: string;
  image?: string;
  admin: string;
  managers?: Manager[];
  managerIds?: string[];
}

export interface Menu {
  name: string;
  price: number;
  description: string;
}

export interface Manager {
  id?: string;
  name: string;
  address: string;
  phone: string;
  jobRole: string;
}

export interface User {
  uid: string; // Unique identifier from Firebase Authentication
  email: string;
  displayName: string;
  createdAt: FirebaseFirestore.Timestamp | null;
}
