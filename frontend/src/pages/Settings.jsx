import { Moon, Palette, Shell } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const THEMES = [
  {
    id: "lofi",
    name: "Lofi",
    icon: Shell,
    description: "Clean and bright interface",
  },
  {
    id: "dark",
    name: "Dark",
    icon: Moon,
    description: "Easy on the eyes",
  },
  {
    id: "retro",
    name: "Retro",
    icon: Palette,
    description: "Classic vintage vibes",
  },
];

const PREVIEW_MESSAGES = [
  {
    id: Math.random().toString(36).substring(2, 15),
    isSent: false,
    content: "Hey! How's it going?",
    time: "10:30 AM",
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    isSent: true,
    content: "I'm doing great! Just working on some cool features 🚀",
    time: "10:32 AM",
  },
  {
    id: Math.random().toString(36).substring(2, 15),
    isSent: false,
    content: "That sounds awesome! Can't wait to see it.",
    time: "10:33 AM",
  },
];

const Settings = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-base-content mb-2">
            Settings
          </h1>
          <p className="text-base-content/60">Customize your experience</p>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-base-content mb-1">
              Appearance
            </h2>
            <p className="text-sm text-base-content/60">
              Choose how the app looks to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {THEMES.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;

              return (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`relative flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? "border-primary bg-base-200 shadow-md"
                      : "border-base-300 bg-base-100 hover:border-base-content/20 hover:shadow-sm"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-primary-content"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-full transition-colors ${
                      isActive ? "bg-primary" : "bg-base-200"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isActive
                          ? "text-primary-content"
                          : "text-base-content/60"
                      }`}
                    />
                  </div>

                  <div className="text-center">
                    <h3
                      className={`font-medium mb-1 ${
                        isActive ? "text-base-content" : "text-base-content/80"
                      }`}
                    >
                      {t.name}
                    </h3>
                    <p className="text-xs text-base-content/60">
                      {t.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-base-content mb-1">
              Preview
            </h2>
            <p className="text-sm text-base-content/60">
              See how your messages will look
            </p>
          </div>

          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-200">
            <div className="px-4 py-3 bg-base-100 border-b border-base-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-content font-semibold">
                    ML
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-base-content text-sm">
                    Maria Laura
                  </h3>
                  <p className="text-xs text-success flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4 bg-base-200 min-h-[280px]">
              {PREVIEW_MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex flex-col max-w-[75%]">
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.isSent
                          ? "bg-primary text-primary-content rounded-br-md"
                          : "bg-base-100 text-base-content border border-base-300 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <span
                      className={`text-xs text-base-content/60 mt-1 px-1 ${
                        msg.isSent ? "text-right" : "text-left"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-3 bg-base-100 border-t border-base-300">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-base-200 rounded-xl border border-base-300">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-base-content placeholder:text-base-content/40 outline-none"
                  disabled
                />
                <button
                  disabled
                  className="p-2 bg-primary text-primary-content rounded-lg opacity-50 cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
