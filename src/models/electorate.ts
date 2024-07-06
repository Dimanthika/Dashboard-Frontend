export default interface ElectorateDistrict {
  id: number;
  name: string;
  currentVoters: number;
  electorateDistrict: number;
  isActive: boolean;
  createdAt: string;
  ElectorateDistrict?: {
    id: number;
    name: string;
    currentVoters?: number;
    electorateDistrict?: number;
    isActive?: boolean;
    createdAt?: string;
  };
}
