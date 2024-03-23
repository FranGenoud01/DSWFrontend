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
}
