import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Member } from "../models/member";

export default class MemberStore {
    members: Member[] = [];

    constructor(){
        makeAutoObservable(this);
    }

    loadMembers = async () => {
        try {
            const members = await agent.Members.list();
            runInAction(() => {
                this.members = members;
            });
        }catch(error) {
            console.log(error);
        }
    }
}