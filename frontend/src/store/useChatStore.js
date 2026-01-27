import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data })
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to load users.");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data })
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error("Failed to load messages.");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessages: async (newMessages) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, newMessages);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message.");
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })

}))