import { Member } from "./member";
import { Status } from "./status";
import { User } from "./user";

export interface Alert{
    id: string;
    longitude: number;
    latitude: number;
    status: Status;
    user: User;
}
