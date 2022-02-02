import { createContext, useContext } from "react";
import ChatStore from "./chatStore";
import CommonStore from "./commonStore";
import MemberStore from "./memberStore";
import MessageStore from "./messageStore";
import UserStore from "./userStore";

interface Store{
    chatStore: ChatStore;
    commonStore: CommonStore;
    userStore: UserStore;
    memberStore: MemberStore;
    messageStore: MessageStore;
}

export const store: Store = {
    chatStore: new ChatStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    memberStore: new MemberStore(),
    messageStore: new MessageStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}