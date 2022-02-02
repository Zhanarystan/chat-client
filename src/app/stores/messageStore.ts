import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Message } from "../models/message";
import { store } from "./store";

export default class MessageStore {
    messages: Message[] = [];
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/alerthub', {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Error established the connection: ', error));

        this.hubConnection.on('LoadAlerts', (messages: Message[]) => {
            runInAction(() => {
                // messages.forEach(message => {
                //     message.createdAt = new Date(message.createdAt + 'Z');
                // })
                this.messages = messages;
            });
        });

        this.hubConnection.on('ReceiveAlert', (message: Message) => {
            runInAction(() => {
                // message.createdAt = new Date(message.createdAt);
                this.messages.push(message);
                console.log(message);
            });
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearMessages = () => {
        this.messages = [];
        this.stopHubConnection();
    }

    addMessage = async (text: string) => {
        const values: any = {
            text,
            chatId: store.chatStore.selectedChat?.id,
            authorUsername: store.userStore.user?.username,
        }
        console.log(values);
        try{
            await this.hubConnection?.invoke('SendMessage', values);
        }catch(error){
            console.log(error);
        }
    }

    addAlert = async (longitude: string, latitude: string) => {
        const values: any = {
            longitude,
            latitude,
            username: store.userStore.user?.username
        }
        console.log(values);
        try{
            await this.hubConnection?.invoke('SendMessage', values);
        }catch(error){
            console.log(error);
        }
    }
}