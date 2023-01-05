export interface Mood {
    _id: string;
    provider_id: string;
    provider_name?: any;
    receiver_id: string;
    mood_text: string;
    mood_date?: Date;
  }
  