export interface PropsAuth {
  name: string;
  email: string;
  image: string;
  id: number;
  role: string;
  city?: string;
}
export interface AccessType {
  status: number;
  success?: boolean;
}

export interface JOBsheetProps {
  email: string;
  address: string;
  circle: string;
  product: string;
  division: string;
  id: string;
  madeBy: string;
  serial: string;
  modelno: string;
  callClosed: string;
  verifiedBy: string;
  totalAmount: string;
  visitDate: string;
  createdAt: string;
}
export interface UserForm {
  id: string;
  informationDate: string;
  location: string;
  email: string;
  machineInstalled: string;
  make: string;
  type: string;
  tonnage: string;
  serial: number;
  priority: string;
  problem: string;
}

export interface revenueTypesProps {
  totalAmount: number;
  id: string;
  product: string;
  actionTaken: string[];
  createdAt: string;
}

export interface ComplainProps {
  id: string;
  email: string;
  complainId: string;
  city: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
}
