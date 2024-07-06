export default interface Election {
  id: number;
  description: string;
  electionDate: string;
  isActive: boolean;
  isComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
}
