export interface Feedback {
  _id: string;
  provider_id: string;
  provider_name?: any;
  receiver_id: string;
  feedback_text: string;
  feedback_date?: Date;
 
}
