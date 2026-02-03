import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageCircleCode,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ElementsPatterns from "../components/ElementsPatterns";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.password) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = await signup(formData);
    if (success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#F3F4F6]">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4 group">
              <div className="size-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <MessageCircleCode className="text-white" size={58} color="#000" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight">
                  Create Account
                </h1>
                <p className="text-[#6B7280] text-sm">
                  Join us to start your journey
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#1A1A1A] block"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="size-5 text-[#6B7280]" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent transition-all"
                  placeholder="Maria Laura"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  disabled={isSigningUp}
                />
              </div>
            </div>

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
                  disabled={isSigningUp}
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
                  disabled={isSigningUp}
                />
                <button
                  type="button"
                  className="absolute right-0 inset-y-0 pr-4 flex items-center hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSigningUp}
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
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Creating account...</span>
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center pt-4">
            <p className="text-[#6B7280] text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#1A1A1A] font-medium hover:underline transition-all"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <ElementsPatterns
        title="Join Us"
        description="Create your account to start exploring our platform."
      />
    </div>
  );
};

export default Signup;