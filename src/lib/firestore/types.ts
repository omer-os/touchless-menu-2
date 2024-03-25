export interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  menu?: Menu[];
  location?: string;
  phone?: string;
  image?: string;
  admin: string;
  managers?: Manager[]; // Replace managerIds with an array of Manager objects
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
