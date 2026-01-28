import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, CheckCircle, Sparkles } from "lucide-react";
import imageCompression from "browser-image-compression";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
      setSelectedImage(base64);
      await updateProfile({ profilePicture: base64 });
    } catch (error) {
      console.error("Error reading file:", error);
      return;
    }
  };

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="max-w-6xl mx-auto p-4 py-8">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-8 mb-6 overflow-hidden shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-base-100/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary-content animate-pulse" />
              <h1 className="text-3xl font-bold text-primary-content">
                Your Profile
              </h1>
              <Sparkles className="w-5 h-5 text-primary-content animate-pulse" />
            </div>
            <p className="text-primary-content/80 text-sm max-w-md">
              Manage your personal information and customize your experience
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Picture Card */}
          <div className="md:col-span-1">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  {/* Avatar with ring animation */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-75 group-hover:opacity-100 transition-opacity blur-md"></div>
                  <img
                    src={
                      selectedImage ||
                      authUser?.profilePicture ||
                      "/avatar.png"
                    }
                    alt="Profile"
                    className="relative size-32 rounded-full object-cover border-4 border-base-100 shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Camera button */}
                  <label
                    htmlFor="avatar-upload"
                    className={`
                      absolute bottom-0 right-0 p-2.5 rounded-full cursor-pointer 
                      bg-primary text-primary-content shadow-lg
                      hover:scale-110 hover:rotate-12 active:scale-95
                      transition-all duration-200
                      ${
                        isUpdatingProfile
                          ? "animate-pulse pointer-events-none opacity-50"
                          : ""
                      }
                    `}
                  >
                    <Camera className="w-5 h-5" strokeWidth={2.5} />
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isUpdatingProfile}
                    />
                  </label>
                </div>

                <div className="text-center">
                  <p className="text-sm text-base-content/60 mb-2">
                    {isUpdatingProfile ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="loading loading-spinner loading-xs"></span>
                        Updating...
                      </span>
                    ) : (
                      "Click camera to update photo"
                    )}
                  </p>
                  
                  {/* Status badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success rounded-full text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Active
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="md:col-span-2 space-y-4">
            {/* Personal Information Card */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-4 h-4 text-primary" />
                </div>
                Personal Information
              </h2>

              <div className="space-y-4">
                {/* Full Name */}
                <div className="group">
                  <label className="text-xs font-medium text-base-content/60 mb-1.5 flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Full Name
                  </label>
                  <div className="px-4 py-3 bg-base-200 rounded-xl border border-base-300 group-hover:border-primary/30 transition-colors">
                    <p className="text-base-content font-medium">
                      {authUser?.fullName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="group">
                  <label className="text-xs font-medium text-base-content/60 mb-1.5 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-base-200 rounded-xl border border-base-300 group-hover:border-primary/30 transition-colors">
                    <p className="text-base-content font-medium break-all">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Details Card */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <h2 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-secondary" />
                </div>
                Account Details
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-base-content">
                      Member Since
                    </span>
                  </div>
                  <span className="text-sm text-base-content/70 font-medium">
                    {memberSince}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-base-200 rounded-xl hover:bg-base-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-sm font-medium text-base-content">
                      Account Status
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success rounded-lg text-xs font-semibold">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;