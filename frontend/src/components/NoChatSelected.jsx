import { MessageCircle, Sparkles, ArrowLeft, MessageCircleCode } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="max-w-md text-center space-y-6 relative z-10">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl opacity-20 blur-xl animate-pulse"></div>
            
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/20 shadow-2xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl"></div>
              <MessageCircleCode className="w-12 h-12 text-primary relative z-10" />
              
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-ping" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-secondary animate-pulse [animation-delay:0.5s]" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
            Welcome to Instant Chat! 👋
          </h2>
          <p className="text-base-content/70 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
          <div className="bg-base-100 p-4 rounded-xl border border-base-300 hover:border-primary/50 transition-all duration-300 hover:scale-105 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-sm text-base-content mb-1">
              Real-time
            </h3>
            <p className="text-xs text-base-content/60">
              Instant messaging
            </p>
          </div>

          <div className="bg-base-100 p-4 rounded-xl border border-base-300 hover:border-secondary/50 transition-all duration-300 hover:scale-105 group [animation-delay:0.1s]">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm text-base-content mb-1">
              Media Share
            </h3>
            <p className="text-xs text-base-content/60">
              Share photos
            </p>
          </div>

          <div className="bg-base-100 p-4 rounded-xl border border-base-300 hover:border-accent/50 transition-all duration-300 hover:scale-105 group [animation-delay:0.2s]">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-sm text-base-content mb-1">
              Secure
            </h3>
            <p className="text-xs text-base-content/60">
              Private chats
            </p>
          </div>
        </div>

        <div className="pt-4">
          <div className="inline-flex items-center gap-2 text-sm text-base-content/60 bg-base-200/50 px-4 py-2 rounded-full border border-base-300">
            <ArrowLeft className="w-4 h-4 animate-bounce-horizontal" />
            <span>Choose a contact to get started</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
      <div className="absolute top-10 right-20 w-16 h-16 border-2 border-secondary/20 rounded-lg animate-spin-slow [animation-delay:1s]"></div>
    </div>
  );
};

export default NoChatSelected;