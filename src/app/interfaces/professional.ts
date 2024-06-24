import { healthInsurance } from './healthInsurance';

export interface Speciality {
  id: number;
  description: string;
}

export interface Professional {
  licenseNumber: string;
  name: string;
  surname: string;
  speciality: Speciality;
  price: number;
  healthInsurances: healthInsurance[];
}

export interface Professional2 {
  licenseNumber: string;
  name: string;
  surname: string;
  speciality: Speciality;
  price: number;
  healthInsurances: healthInsurance[] | number[];
}
