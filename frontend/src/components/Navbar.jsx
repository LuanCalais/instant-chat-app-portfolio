import { useAuthStore } from "../store/useAuthStore";
import { Baby, Cog, DoorOpen, MessageCircleCode, UsersRound } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const success = logout();
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-base-100/80 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-primary/50">
                <MessageCircleCode
                  className="size-5 text-primary-content"
                  strokeWidth={2}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-base-100 animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-base-content tracking-tight">
                Instant Chat
              </h1>
              <p className="text-[10px] text-base-content/50 -mt-0.5">
                Stay Connected
              </p>
            </div>
          </Link>

          {authUser && (
            <nav className="flex items-center gap-2">
              <Link
                to="/"
                className={`
                  relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl
                  transition-all duration-200 group overflow-hidden
                  ${
                    isActive("/")
                      ? "bg-base-200 text-base-content"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  }
                `}
              >
                {!isActive("/") && (
                  <span className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}

                <UsersRound
                  className="size-6 group-hover:scale-110 transition-transform duration-200 relative z-10"
                  strokeWidth={2}
                />
                <span className="hidden sm:inline text-sm font-medium relative z-10">
                  Chats
                </span>

                {isActive("/") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-content rounded-full"></span>
                )}
              </Link>

              <Link
                to="/profile"
                className={`
                  relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl
                  transition-all duration-200 group overflow-hidden
                  ${
                    isActive("/profile")
                      ? "bg-base-200 text-base-content"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  }
                `}
              >
                {!isActive("/profile") && (
                  <span className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}

                <Baby
                  className="size-6 group-hover:scale-110 transition-transform duration-200 relative z-10"
                  strokeWidth={2}
                />
                <span className="hidden sm:inline text-sm font-medium relative z-10">
                  Profile
                </span>

                {isActive("/profile") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-content rounded-full"></span>
                )}
              </Link>

              <Link
                to="/settings"
                className={`
                  relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl
                  transition-all duration-200 group overflow-hidden
                  ${
                    isActive("/settings")
                      ? "bg-base-200 text-base-content"
                      : "text-base-content/70 hover:text-base-content hover:bg-base-200"
                  }
                `}
              >
                {!isActive("/settings") && (
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}

                <Cog
                  className={`size-6 transition-all duration-300 relative z-10 ${
                    isActive("/settings") ? "" : "group-hover:rotate-90"
                  }`}
                  strokeWidth={2}
                />
                <span className="hidden sm:inline text-sm font-medium relative z-10">
                  Settings
                </span>

                {isActive("/settings") && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary-content rounded-full"></span>
                )}
              </Link>

              <div className="w-px h-6 bg-base-300 mx-1 hidden sm:block"></div>

              <button
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-base-content/70 hover:text-error hover:bg-error/10 transition-all duration-200 group overflow-hidden"
                onClick={handleLogout}
                type="button"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-error/5 to-error/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                <DoorOpen
                  className="size-6 group-hover:-translate-x-0.5 transition-transform duration-200 relative z-10"
                  strokeWidth={2}
                />
                <span className="hidden sm:inline text-sm font-medium relative z-10">
                  Logout
                </span>
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
