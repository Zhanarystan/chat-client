import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Alert } from "../models/alert";
import { Message } from "../models/message";
import { store } from "./store";

export default class AlertStore {
    alerts: Alert[] = [];
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/alerthub')
            .build();

        this.hubConnection.start().catch(error => console.log('Error established the connection: ', error));

        this.hubConnection.on('LoadAlerts', (alerts: Alert[]) => {
            runInAction(() => {
                // messages.forEach(message => {
                //     message.createdAt = new Date(message.createdAt + 'Z');
                // })
                this.alerts = alerts;
            });
        });

        this.hubConnection.on('ReceiveAlert', (alert: Alert) => {
            runInAction(() => {
                // message.createdAt = new Date(message.createdAt);
                this.alerts.push(alert);
                console.log(alert);
            });
        })
        
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearMessages = () => {
        this.alerts = [];
        this.stopHubConnection();
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