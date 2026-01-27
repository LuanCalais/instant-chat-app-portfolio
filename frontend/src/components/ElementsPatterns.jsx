const ElementsPatterns = ({ title, description }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-white p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#1A1A1A]"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-md text-center relative z-10">
        <div className="mb-12 relative h-[320px] flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-[2rem] bg-[#1A1A1A] shadow-2xl animate-float">
            <div className="absolute inset-4 rounded-[1.5rem] border-2 border-white/10" />
          </div>

          <div className="absolute top-8 left-12 w-20 h-20 rounded-2xl bg-[#F3F4F6] shadow-lg animate-float-delay-1">
            <div className="p-3 space-y-1.5">
              <div className="h-1.5 bg-[#E5E7EB] rounded-full w-12" />
              <div className="h-1.5 bg-[#E5E7EB] rounded-full w-8" />
            </div>
          </div>

          <div className="absolute top-4 right-16 w-24 h-24 rounded-3xl bg-[#6B7280] shadow-xl animate-float-delay-2">
            <div className="p-4 space-y-2">
              <div className="h-1.5 bg-white/20 rounded-full w-14" />
              <div className="h-1.5 bg-white/20 rounded-full w-10" />
              <div className="h-1.5 bg-white/20 rounded-full w-16" />
            </div>
          </div>

          <div className="absolute bottom-12 left-16 w-16 h-16 rounded-xl bg-[#E5E7EB] shadow-md animate-float-delay-3">
            <div className="p-2.5 space-y-1">
              <div className="h-1 bg-[#D1D5DB] rounded-full w-8" />
              <div className="h-1 bg-[#D1D5DB] rounded-full w-10" />
            </div>
          </div>

          <div className="absolute bottom-8 right-12 w-28 h-20 rounded-2xl bg-[#1A1A1A] shadow-2xl animate-float-delay-4">
            <div className="p-3 space-y-1.5">
              <div className="h-1.5 bg-white/10 rounded-full w-16" />
              <div className="h-1.5 bg-white/10 rounded-full w-12" />
            </div>
          </div>

          <div className="absolute top-20 right-8 w-3 h-3 rounded-full bg-[#6B7280] animate-pulse" />
          <div className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-[#1A1A1A] animate-pulse delay-300" />
          <div className="absolute top-1/3 right-4 w-2.5 h-2.5 rounded-full bg-[#9CA3AF] animate-pulse delay-700" />
        </div>

        <div className="space-y-3 px-4">
          <h2 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight">
            {title}
          </h2>
          <p className="text-[#6B7280] text-base leading-relaxed max-w-sm mx-auto">
            {description}
          </p>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
          <div className="w-2 h-2 rounded-full bg-[#6B7280]" />
          <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#F3F4F6]/50 via-transparent to-[#F3F4F6]/30 pointer-events-none" />
    </div>
  );
};

export default ElementsPatterns;