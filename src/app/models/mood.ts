export interface Mood {
  _id: string;
  creation_date: Date;
  creator_name: string;
  creator_id: string;
  emotion: string;
  text?: string;
  hidden: boolean;
  supervisor_id: string;
}

