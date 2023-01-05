export interface Mood {
  _id: string;
  creation_date: Date;
  creator_id: string;
  creator_name: string;
  text: string;
  emotion: string;
  supervisor_id: string;
}
