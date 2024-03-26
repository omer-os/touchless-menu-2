export interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  menus?: MenuItem[]; // A restaurant can have multiple top-level menu items
  location?: string;
  phone?: string;
  image?: string;
  admin: string;
  managerIds?: string[];
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

export interface MenuItem {
  id?: string;
  name: string;
  type: "category" | "item";
  parentId: string | null;
  description?: string;
  price?: number;
  image?: string;
  options?: string[];
}
