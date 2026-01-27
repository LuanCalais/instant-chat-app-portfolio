import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const fileRef = useRef(null);
  const { sendMessages } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFilePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !filePreview) return;

    try {
      await sendMessages({ text: text.trim(), image: filePreview });
      setText("");
      removeImage();
      setFilePreview(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-base-100 border-t border-base-300 p-4">
      {filePreview && (
        <div className="mb-3 animate-in slide-in-from-bottom-2 duration-200">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 group-hover:opacity-30 transition-opacity blur-sm"></div>
            <img
              src={filePreview}
              alt="Preview"
              className="relative w-28 h-28 object-cover rounded-xl border-2 border-primary/50 shadow-lg"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-error text-error-content flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-200 shadow-lg"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-4" strokeWidth={2.5} />
            </button>
            <div className="absolute bottom-2 left-2 px-2 py-1 bg-base-100/90 backdrop-blur-sm rounded-md text-xs font-medium text-base-content flex items-center gap-1">
              <Image className="w-3 h-3" />
              Image
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <div className="relative flex items-center bg-base-200 rounded-2xl border-2 border-base-300 focus-within:border-primary transition-all duration-200 shadow-sm hover:shadow-md">
            <input
              type="text"
              className="flex-1 px-4 py-3 bg-transparent text-base-content placeholder:text-base-content/40 focus:outline-none"
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileRef}
              onChange={handleImageChange}
            />

            <button
              type="button"
              className={`p-2 mr-1 rounded-xl transition-all duration-200 ${
                filePreview
                  ? "text-primary bg-primary/10 hover:bg-primary/20"
                  : "text-base-content/40 hover:text-secondary hover:bg-secondary/10 hover:scale-110"
              }`}
              onClick={() => fileRef.current?.click()}
              aria-label="Attach image"
            >
              <Image className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!text.trim() && !filePreview}
          className={`relative group p-3.5 rounded-2xl transition-all duration-300 ${
            !text.trim() && !filePreview
              ? "bg-base-300 text-base-content/30 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary text-primary-content hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl active:scale-95"
          }`}
          aria-label="Send message"
        >
          {(text.trim() || filePreview) && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-0 group-hover:opacity-75 blur-md transition-opacity duration-300"></div>
          )}
          <Send
            className={`w-5 h-5 relative z-10 transition-transform duration-200 ${
              text.trim() || filePreview ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : ""
            }`}
            strokeWidth={2.5}
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;