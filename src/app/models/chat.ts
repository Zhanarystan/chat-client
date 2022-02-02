import { Member } from "./member";

export interface Chat{
    id: string;
    members: Member[];
    destination: Member;
    lastMessage: string;
}

export interface ChatItem{
    id: string;
    destination: Member;
    lastMessage:string;
}