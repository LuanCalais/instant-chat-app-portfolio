import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        <span className="animate-bounce [animation-delay:0s]">.</span>
        <span className="animate-bounce [animation-delay:0.15s]">.</span>
        <span className="animate-bounce [animation-delay:0.3s]">.</span>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/settings"
          element={authUser ? <Settings /> : <Navigate to="login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
