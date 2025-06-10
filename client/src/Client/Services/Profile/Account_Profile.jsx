import React from 'react'
import Navbar from '../../Components/Navbar'


export default function Account() {
  const [profile, setProfile] = React.useState({
    name: "Rhen Devs",
    username: "rhen_devs",
    email: "rhen@example.com",
    phone: "",
    language: "English",
    notifications: { email: true, sms: false },
    address: {
      street: "",
      city: "",
      province: "",
      zip: "",
    },
    password: "",
    twoFactor: false,
    theme: "light",
    privacy: {
      privateProfile: false,
      hideStatus: false,
      allowIndex: true,
    },
    connected: {
      google: false,
      twitter: true,
      facebook: false,
    },
  });
  const [photo, setPhoto] = React.useState(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["street", "city", "province", "zip"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else if (["privateProfile", "hideStatus", "allowIndex"].includes(name)) {
      setProfile((prev) => ({
        ...prev,
        privacy: { ...prev.privacy, [name]: type === "checkbox" ? checked : value },
      }));
    } else if (name === "password") {
      setProfile((prev) => ({ ...prev, password: value }));
    } else if (name === "theme") {
      setProfile((prev) => ({ ...prev, theme: value }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, [name]: checked },
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTwoFactor = () => {
    setProfile((prev) => ({ ...prev, twoFactor: !prev.twoFactor }));
  };

  const handleThemeChange = (e) => {
    setProfile((prev) => ({ ...prev, theme: e.target.value }));
  };

  const handlePrivacyChange = (e) => {
    const { name, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      privacy: { ...prev.privacy, [name]: checked },
    }));
  };

  const handleConnectAccount = (provider) => {
    setProfile((prev) => ({
      ...prev,
      connected: { ...prev.connected, [provider]: !prev.connected[provider] },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic here
    alert("Profile updated!");
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    // Delete logic here
    alert("Account deleted!");
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 mt-20">
         {/* Custom Title */}
          <div className="flex items-center gap-5 px-12 pt-8 rounded-3xl mt-10 pb-6 border-b border-blue-100 bg-gradient-to-r from-blue-200 via-blue-100 to-gray-100">
            <div className="bg-blue-700 rounded-full p-3 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-wide letter-spacing-wide">
                Account Settings
              </div>
              <div className="text-blue-600 text-base mt-1 font-medium">
                Manage your personal information, security, and preferences
              </div>
            </div>
          </div>
        <div className="w-full max-w-5xl mx-auto my-12 rounded-3xl shadow-2xl overflow-hidden border border-blue-100 bg-white/80 backdrop-blur-lg">
         
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-200 via-blue-300 to-blue-800 px-10 py-12 flex flex-col sm:flex-row items-center gap-10 relative">
            <div className="absolute top-6 right-8">
              <button className="bg-blue-200 hover:bg-blue-300 text-blue-900 px-5 py-2.5 rounded-xl border border-blue-300 transition font-semibold shadow flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                Add New
              </button>
            </div>
            <div className="relative">
              <img
                src={photo || "https://via.placeholder.com/96"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg ring-4 ring-blue-400"
              />
              <label className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow cursor-pointer transition border-2 border-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6M2 20h7l9-9a2.828 2.828 0 10-4-4l-9 9v7z" /></svg>
                <input type="file" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="text-4xl font-extrabold text-blue-900 tracking-tight">{profile.name}</div>
              <div className="text-blue-700 text-lg font-mono">@{profile.username}</div>
              <div className="text-sm text-blue-600 mt-1">Member since Jan 2023</div>
            </div>
          </div>
          {/* Main Content */}
          <form
            className="bg-blue-50/90 px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-14"
            onSubmit={handleSubmit}
          >
            {/* Account Info */}
            <div className="space-y-10">
              <div>
                <label className="block mb-1 font-semibold text-blue-900">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-blue-100 text-blue-400 font-medium"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">Language</label>
                <select
                  name="language"
                  value={profile.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-900 focus:ring-2 focus:ring-blue-300 transition"
                >
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-semibold text-blue-900">Notifications</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="email"
                      checked={profile.notifications.email}
                      onChange={handleNotificationChange}
                      className="form-checkbox accent-blue-600"
                    />
                    <span className="ml-2 text-blue-900">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="sms"
                      checked={profile.notifications.sms}
                      onChange={handleNotificationChange}
                      className="form-checkbox accent-blue-600"
                    />
                    <span className="ml-2 text-blue-900">SMS</span>
                  </label>
                </div>
              </div>
            </div>
            {/* Address & Security */}
            <div className="space-y-10">
              <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-2xl p-8 shadow flex flex-col gap-3 border border-blue-200">
                <label className="block mb-1 font-semibold text-blue-900">Address</label>
                <input
                  type="text"
                  name="street"
                  value={profile.address.street}
                  onChange={handleInputChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 text-blue-900 mb-2"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    name="city"
                    value={profile.address.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 text-blue-900"
                  />
                  <input
                    type="text"
                    name="province"
                    value={profile.address.province}
                    onChange={handleInputChange}
                    placeholder="Province"
                    className="w-full px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 text-blue-900"
                  />
                  <input
                    type="text"
                    name="zip"
                    value={profile.address.zip}
                    onChange={handleInputChange}
                    placeholder="ZIP"
                    className="w-full px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 text-blue-900"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-100 rounded-2xl p-6 shadow border border-blue-200">
                  <label className="block mb-1 font-semibold text-blue-900">Change Password</label>
                  <input
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleInputChange}
                    placeholder="New Password"
                    className="w-full px-4 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-900"
                  />
                </div>
                <div className="bg-gradient-to-br from-blue-300 via-blue-100 to-blue-50 rounded-2xl p-6 shadow flex flex-col justify-between border border-blue-200">
                  <label className="block mb-1 font-semibold text-blue-900">Two-Factor Authentication</label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-blue-700 text-sm">
                      {profile.twoFactor ? "Enabled" : "Disabled"}
                    </span>
                    <button
                      type="button"
                      onClick={handleTwoFactor}
                      className={`px-4 py-1 ${
                        profile.twoFactor
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-700 hover:bg-blue-800"
                      } text-white rounded-xl transition font-semibold shadow`}
                    >
                      {profile.twoFactor ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="col-span-1 md:col-span-2 border-t border-blue-200 my-4"></div>
            {/* Actions */}
            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-14 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl font-semibold hover:from-blue-800 hover:to-blue-950 transition shadow-xl"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="w-full sm:w-auto px-14 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-800 transition shadow-xl"
              >
                Delete Account
              </button>
            </div>
          </form>
          {/* More Contents Below */}
          <div className="bg-blue-50/90 px-10 py-14 border-t border-blue-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Recent Activity */}
              <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-2xl p-8 shadow text-blue-900 border border-blue-200">
                <div className="font-bold text-xl mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  Recent Activity
                </div>
                <ul className="text-base space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l3 3" />
                      </svg>
                    </span>
                    <span>Logged in from new device</span>
                    <span className="ml-auto text-blue-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      2 hours ago
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l2 2" />
                      </svg>
                    </span>
                    <span>Changed password</span>
                    <span className="ml-auto text-blue-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l2 2" />
                      </svg>
                      1 day ago
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l1 3" />
                      </svg>
                    </span>
                    <span>Updated address</span>
                    <span className="ml-auto text-blue-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l1 2" />
                      </svg>
                      3 days ago
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-200">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l-2 2" />
                      </svg>
                    </span>
                    <span>Enabled notifications</span>
                    <span className="ml-auto text-blue-700 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l-2 2" />
                      </svg>
                      1 week ago
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-100 rounded-2xl p-8 shadow border border-blue-200">
                <div className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
                  Connected Accounts
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-200 transition ${
                      profile.connected.google ? "opacity-70 ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => handleConnectAccount("google")}
                  >
                    <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.23-1.39 3.62-5.27 3.62-3.17 0-5.76-2.62-5.76-5.84s2.59-5.84 5.76-5.84c1.8 0 3.01.77 3.7 1.43l2.53-2.46C16.09 4.13 14.3 3.2 12.17 3.2 6.98 3.2 2.67 7.57 2.67 12.2s4.31 9 9.5 9c5.47 0 9.09-3.85 9.09-9.28 0-.62-.07-1.09-.16-1.62z"/></svg>
                    Google
                    <span className="ml-auto text-xs text-blue-700">
                      {profile.connected.google ? "Connected" : "Not Connected"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-200 transition ${
                      profile.connected.twitter ? "opacity-70 ring-2 ring-blue-700" : ""
                    }`}
                    onClick={() => handleConnectAccount("twitter")}
                  >
                    <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.1 4.9a4.28 4.28 0 0 0 1.32 5.71c-.7-.02-1.36-.21-1.94-.53v.05a4.28 4.28 0 0 0 3.43 4.2c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.29 4.29 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"/></svg>
                    Twitter
                    <span className="ml-auto text-xs text-blue-700">
                      {profile.connected.twitter ? "Connected" : "Not Connected"}
                    </span>
                  </button>
                  <button
                    type="button"
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-200 transition ${
                      profile.connected.facebook ? "opacity-70 ring-2 ring-blue-900" : ""
                    }`}
                    onClick={() => handleConnectAccount("facebook")}
                  >
                    <svg className="w-5 h-5 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-1.72-.16-5.6-.16-7.32 0-1.72.16-2.89.69-3.59 1.39-.7.7-1.23 1.87-1.39 3.59-.16 1.72-.16 5.6 0 7.32.16 1.72.69 2.89 1.39 3.59.7.7 1.87 1.23 3.59 1.39 1.72.16 5.6.16 7.32 0 1.72-.16 2.89-.69 3.59-1.39.7-.7 1.23-1.87 1.39-3.59.16-1.72.16-5.6 0-7.32-.16-1.72-.69-2.89-1.39-3.59-.7-.7-1.87-1.23-3.59-1.39zm-7.615 8.816v-3.5l6 3.5-6 3.5v-3.5z"/></svg>
                    Facebook
                    <span className="ml-auto text-xs text-blue-700">
                      {profile.connected.facebook ? "Connected" : "Not Connected"}
                    </span>
                  </button>
                </div>
              </div>
              {/* Security Tips */}
              <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-2xl p-8 shadow text-blue-900 border border-blue-200">
                <div className="font-bold text-xl mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 12v2m0-6v2m-6 6h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  Security Tips
                </div>
                <ul className="list-disc list-inside text-base space-y-2 text-blue-800">
                  <li>Use a strong, unique password for your account.</li>
                  <li>Enable two-factor authentication for extra security.</li>
                  <li>Never share your password with anyone.</li>
                  <li>Review your connected accounts regularly.</li>
                </ul>
              </div>
            </div>
            {/* Preferences */}
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-blue-100 rounded-2xl p-8 shadow border border-blue-200">
                <div className="font-bold text-xl mb-4 text-blue-900 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" /></svg>
                  Theme Preferences
                </div>
                <div className="flex items-center gap-8 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      className="accent-blue-700"
                      checked={profile.theme === "light"}
                      onChange={handleThemeChange}
                    />
                    <span>Light</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      className="accent-blue-700"
                      checked={profile.theme === "dark"}
                      onChange={handleThemeChange}
                    />
                    <span>Dark</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      className="accent-blue-700"
                      checked={profile.theme === "system"}
                      onChange={handleThemeChange}
                    />
                    <span>System</span>
                  </label>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 rounded-2xl p-8 shadow text-blue-900 border border-blue-200">
                <div className="font-bold text-xl mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m0-4V4a4 4 0 018 0v6" /></svg>
                  Privacy Settings
                </div>
                <div className="flex flex-col gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="privateProfile"
                      className="accent-blue-700"
                      checked={profile.privacy.privateProfile}
                      onChange={handlePrivacyChange}
                    />
                    <span>Make my profile private</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="hideStatus"
                      className="accent-blue-700"
                      checked={profile.privacy.hideStatus}
                      onChange={handlePrivacyChange}
                    />
                    <span>Hide my activity status</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="allowIndex"
                      className="accent-blue-700"
                      checked={profile.privacy.allowIndex}
                      onChange={handlePrivacyChange}
                    />
                    <span>Allow search engines to index my profile</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-blue-50 rounded-2xl shadow-2xl p-10 max-w-sm w-full border border-blue-200">
              <div className="font-bold text-2xl mb-4 text-blue-900 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                Delete Account
              </div>
              <div className="mb-6 text-blue-800">
                Are you sure you want to delete your account? This action cannot be undone.
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-blue-200 text-blue-900 font-semibold hover:bg-blue-300 transition"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold hover:from-red-600 hover:to-red-800 transition"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        html, body, #root {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html::-webkit-scrollbar, body::-webkit-scrollbar, #root::-webkit-scrollbar {
          display: none;
        }
        .letter-spacing-wide {
          letter-spacing: 0.15em;
        }
      `}</style>
    </>
  );
}
