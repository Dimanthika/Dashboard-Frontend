export default interface Candidate {
  id: number;
  candidateNo: number;
  election: number;
  voter: string;
  electionParty: number;
  isActive?: boolean;
  createdAt?: string;
  Voter?: {
    name: string;
    nic: string;
  };
  ElectionParty?: {
    name: string;
  };
}
