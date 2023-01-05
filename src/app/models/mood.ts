import { Emotion } from "./emotion";

export interface Mood {
    id: string;
    creation_date: Date;
    creator_name: string;
    creator_id: string;
    emotion: string;
    text?: string;
}