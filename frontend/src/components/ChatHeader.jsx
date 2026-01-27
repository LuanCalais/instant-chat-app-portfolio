import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="bg-gradient-to-r from-base-100 via-base-100 to-base-200 border-b border-base-300 px-4 py-3 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full opacity-75 group-hover:opacity-100 blur-sm transition-opacity"></div>
            <div className="relative avatar">
              <div className="size-12 rounded-full ring-2 ring-base-100 ring-offset-2 ring-offset-base-100">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="object-cover"
                />
              </div>
            </div>
            {isOnline && (
              <div className="absolute bottom-0 right-0">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-success border-2 border-base-100"></span>
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base-content truncate">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-success animate-pulse" : "bg-base-300"
                  }`}
                ></span>
                <span
                  className={`text-xs font-medium ${
                    isOnline ? "text-success" : "text-base-content/50"
                  }`}
                >
                  {isOnline ? "Active now" : "Offline"}
                </span>
              </div>
            </div>
          </div>
        </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm btn-circle btn-ghost text-base-content/60 hover:text-error hover:bg-error/10 hover:rotate-90 transition-all duration-200"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
      </div>
    </div>
  );
};

export default ChatHeader;