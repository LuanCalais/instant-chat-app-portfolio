import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageCircleCode,
} from "lucide-react";
import ElementsPatterns from "../components/ElementsPatterns";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(formData);
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F3F4F6]">
      <ElementsPatterns
        title="Welcome back"
        description="Sign in to continue and catch up with your messages."
      />
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="size-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <MessageCircleCode className="text-white" size={58} color="#000" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-[#6B7280] text-sm">
                  Sign in to your account
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#1A1A1A] block"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="size-5 text-[#6B7280]" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
                  placeholder="marialaura@mail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#1A1A1A] block"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="size-5 text-[#6B7280]" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full pl-12 pr-12 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-0 inset-y-0 pr-4 flex items-center hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-[#6B7280] hover:text-[#1A1A1A] transition-colors" />
                  ) : (
                    <Eye className="size-5 text-[#6B7280] hover:text-[#1A1A1A] transition-colors" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-[#2D2D2D] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Signing in...</span>
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-[#6B7280] text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#1A1A1A] font-medium hover:underline transition-all"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
