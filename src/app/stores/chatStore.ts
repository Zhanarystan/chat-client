import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { Chat, ChatItem } from "../models/chat";

export default class ChatStore{
    chats: ChatItem[] = [];
    selectedChat: Chat | undefined = undefined;

    constructor(){
        makeAutoObservable(this);
    }

    loadAlerts = async () => {
        try {
            const alerts = await agent.Alerts.list();
            runInAction(() => {
                this.chats = this.chats;
            })
        } catch(error) {
            console.log(error);
        }
    }
    loadChats = async () => {
        try {
            const chats = await agent.Chats.list();
            runInAction(() => {
                this.chats = chats;
            })
        } catch (error) {
            console.log(error);
        }
    }

    loadChat = async (id:string) => {
        try{
            let chat = await agent.Chats.details(id);
            console.log(chat);
            runInAction(() => {
                this.selectedChat = chat;
            })
        }catch(error){
            console.log(error);
        }
    }
}