import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { formatMessageTime } from "../lib/utils";

const ChatContent = () => {
  const { messages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const endMessageRef = useRef(null);

  useEffect(() => {
    if (endMessageRef?.current && messages) {
      endMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-base-200/30">
        <p className="text-lg text-base-content opacity-60">No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/30">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full border-2 border-base-300 shadow-md">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePicture || "/avatar.png"
                    : selectedUser.profilePicture || "/avatar.png"
                }
                alt="profile-picture"
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <div className="chat-header mb-1">
            <time className="text-xs opacity-60 ml-1 font-medium">
              {formatMessageTime(message.createdAt)}
            </time>
          </div>

          <div
            className={`chat-bubble flex flex-col rounded-3xl shadow-lg ${
              message.senderId === authUser._id
                ? "bg-primary text-primary-content"
                : "bg-base-300 text-base-content border border-base-300"
            }`}
          >
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-2xl mb-2 shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            )}
            {message.text && (
              <p className="break-words leading-relaxed">{message.text}</p>
            )}
          </div>
        </div>
      ))}
      <div ref={endMessageRef} />
    </div>
  );
};

export default ChatContent;
