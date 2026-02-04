import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import ChatMessagesSqueleton from "./skeletons/ChatMessagesSqueleton";
import ChatContent from "./ChatContent";

const ChatContainer = () => {
  const {
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
    getMessages,
  } = useChatStore();

  useEffect(() => {
    subscribeToMessages();
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    return () => unsubscribeToMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <ChatMessagesSqueleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <ChatContent />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
