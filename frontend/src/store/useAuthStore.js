import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignedUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("auth/check");
      set({ authUser: res.data });
      get().socketConnect();
    } catch (error) {
      set({ authUser: null });
      console.error("Error checking authentication:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signup successful!");
      get().socketConnect();
      return true;
    } catch (error) {
      console.error("Error during signup:", error.response.data.message);
      toast.error("Signup fail!" + error.response.data.message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login successful!");
      get().socketConnect();
      return true;
    } catch (error) {
      toast.error(error.response.data.message);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  socketConnect: () => {
    if (get().socket?.connected || get().authUser === null) return;
    const socket = io(SERVER_URL);
    socket.connect();
    set({ socket });
  },

  socketDisconnect: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
    set({ socket: null });
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful!");
      get().socketDisconnect();
      return true;
    } catch (error) {
      console.error("Error during logout:", error.response.data.message);
      toast.error("logout fail!" + error.response.data.message);
      return false;
    } finally {
      set({ authUser: null });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-user-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.log("Error updating profile:", error.response.data.message);
      toast.error("Profile update failed: " + error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
