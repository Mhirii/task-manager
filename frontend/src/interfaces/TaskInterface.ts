export default interface Task {
  _id: string;
  owner: string;
  title: string;
  desc: string;
  project_id: string | undefined // undefined means project title is INBOX
  dateAdded: Date;
  due: Date;
  isDone: boolean;
}