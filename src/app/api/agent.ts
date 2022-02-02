import axios, {AxiosResponse} from "axios";
import { Alert } from "../models/alert";
import { Chat, ChatItem } from "../models/chat";
import { Member } from "../models/member";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user:UserFormValues) => requests.post<User>('/account/register', user)
}

const Members = {
    list: () => axios.get<Member[]>('/members').then(responseBody),
}

const Chats = {
    list: () => axios.get<ChatItem[]>('/chats').then(responseBody),
    details: (id: string) => axios.get<Chat>(`/chats/${id}`).then(responseBody),
}

const Alerts = {
    list: () => axios.get<Alert[]>('/alerts').then(responseBody),
    details: (id: string) => axios.get<Alert>(`/alerts/${id}`).then(responseBody),
}


const agent = {
    Account,
    Members,
    Chats,
    Alerts,
}

export default agent;