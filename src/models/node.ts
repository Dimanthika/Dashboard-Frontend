export default interface Node {
  id: number;
  url: string;
  name: string;
  isActive: boolean;
  availability?: boolean;
  createdAt?: string;
}
