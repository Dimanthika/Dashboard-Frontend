export default interface Voter {
  id: number;
  nic: string;
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  isActive: boolean;
  electorate: number;
  createdAt: string;
  password?: string;
  Electorate?: { id: number; name: string; electorateDistrict: number };
}
