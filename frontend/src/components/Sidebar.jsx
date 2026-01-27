import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeletonComponent from "./skeletons/SidebarSkeletonComponent";
import { Users, Search, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter users based on search
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Separate online and offline users
  const onlineUsersList = filteredUsers.filter((user) =>
    onlineUsers.includes(user._id)
  );
  const offlineUsersList = filteredUsers.filter(
    (user) => !onlineUsers.includes(user._id)
  );

  if (isUsersLoading) return <SidebarSkeletonComponent />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      <div className="border-b border-base-300 p-4 bg-gradient-to-br from-base-100 to-base-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="size-5 text-primary" strokeWidth={2.5} />
          </div>
          <div className="hidden lg:block">
            <h2 className="font-semibold text-base-content">Messages</h2>
            <p className="text-xs text-base-content/60">
              {onlineUsersList.length} online
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/40" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-base-200 border border-base-300 rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 py-2">
        {onlineUsersList.length > 0 && (
          <div className="mb-2">
            <div className="px-4 py-2 hidden lg:block">
              <h3 className="text-xs font-semibold text-success uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Online ({onlineUsersList.length})
              </h3>
            </div>
            {onlineUsersList.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                isSelected={selectedUser?._id === user._id}
                isOnline={true}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        )}

        {offlineUsersList.length > 0 && (
          <div>
            <div className="px-4 py-2 hidden lg:block">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                Offline ({offlineUsersList.length})
              </h3>
            </div>
            {offlineUsersList.map((user) => (
              <UserItem
                key={user._id}
                user={user}
                isSelected={selectedUser?._id === user._id}
                isOnline={false}
                onClick={() => setSelectedUser(user)}
              />
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-base-content/30" />
            </div>
            <p className="text-sm text-base-content/60 hidden lg:block">
              {searchTerm ? "No users found" : "No contacts available"}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

const UserItem = ({ user, isSelected, isOnline, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 flex items-center gap-3 
        hover:bg-base-200 transition-all duration-200
        relative group
        ${isSelected ? "bg-primary/10 border-l-4 border-primary" : ""}
      `}
    >
      <div className="relative mx-auto lg:mx-0 flex-shrink-0">
        <div className="relative">
          {isOnline && (
            <div className="absolute inset-0 bg-gradient-to-r from-success to-primary rounded-full opacity-20 group-hover:opacity-40 blur-sm transition-opacity"></div>
          )}
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.fullName}
            className={`size-12 object-cover rounded-full relative z-10 ${
              isOnline ? "ring-2 ring-success ring-offset-2 ring-offset-base-100" : "opacity-70"
            }`}
          />
        </div>
        
        {isOnline && (
          <span className="absolute bottom-0 right-0 z-20">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-success border-2 border-base-100"></span>
            </span>
          </span>
        )}
      </div>

      <div className="hidden lg:block text-left min-w-0 flex-1">
        <div className={`font-medium truncate ${isSelected ? "text-primary" : "text-base-content"}`}>
          {user.fullName}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isOnline ? "bg-success" : "bg-base-300"
            }`}
          ></span>
          <span className={`text-xs ${isOnline ? "text-success font-medium" : "text-base-content/50"}`}>
            {isOnline ? "Active now" : "Offline"}
          </span>
        </div>
      </div>

      {isSelected && (
        <div className="hidden lg:block ml-auto">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      )}
    </button>
  );
};

export default Sidebar;