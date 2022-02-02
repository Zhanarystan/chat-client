import { User } from "./user";

export interface Message{
    id: number;
    text: string;
    time: Date;
    author: User;
    chatId: string;
}