import { Speciality } from './speciality';

export interface Shift {
  id: number;
  dateShift: string;
  hourShift: string;
  status: string;
  price: number;
  dniPatient: string;
  licenseProfessional: string;
  doctorName: string;
  doctorSurname: string;
  speciality: Speciality;
}
