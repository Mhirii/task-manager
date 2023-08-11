export default interface Project {
  _id?: string;
  owner: string;
  title: string;
  color: string;
  tasks?: string[];
  dateAdded: Date;
  updatedAt: Date;
}