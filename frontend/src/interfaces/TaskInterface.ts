export default interface Task {
  _id: string;
  owner: string;
  title: string;
  desc: string;
  project?: {
    id: string
  };
  dateAdded: Date;
  due: Date;
  isDone: boolean;
}