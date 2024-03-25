export interface Restaurant {
  id?: string;
  name: string;
  description?: string;
  menu?: Menu[];
  location?: string;
  phone?: string;
  image?: string;
  managerId: string;
}

interface Menu {
  name: string;
  price: number;
  description: string;
}
