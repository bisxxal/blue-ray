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
  complains: string[];
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
  call: string;
}

export interface revenueTypesProps {
  totalAmount: number;
  id: string;
  product: string;
  actionTaken: string[];
  createdAt: string;
  madeBy?: string;
}

export interface ComplainProps {
  id: string;
  email: string;
  jobSheetId: string;
  city: string;
  name: string;
  description: string;
  createdAt: string;
  status: string;
}

export interface JOBSheetData  {
  IPVoltage: number;
  ODUStand : number;
  OPVoltage:number
  PartReplacementDetail : string[];
  PinPlug:number;
  actionTaken: string[];
  address: string;
  airFilter: string;
  ambientTemperature:number;
  callClosed: string; 
  circle: string;
  copperPipe: number;
  createdAt: string;
  division: string;
  drainPipe: number;
  earthing: string;
  email: string;
  extraMaterial: string;
  faultFound: string;
  grillTemperature:number
  id: string;
  madeBy:string
  modelno:number
  newSparepartConsumed: string
  product:string
  roomTemperature:number
  serial :number
  stabilizer: string;
  technicianComments  :string
  technicianName : string;
  totalAmount:number
  verifiedBy : string;
  visitDate: string;
  wire : string;
}