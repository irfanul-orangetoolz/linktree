import React from "react"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import EditProfilePage from "./pages/EditProfilePage"
import LinkManagementPage from "./pages/LinkManagementPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePreviewPage from "./pages/ProfilePreviewPage"
import PublicProfilePage from "./pages/PublicProfilePage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage"
import Home from "./pages/Home"

function App() {
	return (
		<div className="min-h-screen bg-gray-100">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/edit-profile" element={<EditProfilePage />} />
				<Route path="/links" element={<LinkManagementPage />} />
				<Route path="/analytics" element={<AnalyticsPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/preview" element={<ProfilePreviewPage />} />
				<Route
					path="/profiles/:username"
					element={<PublicProfilePage />}
				/>
				<Route path="/admin/users" element={<AdminUsersPage />} />
				<Route
					path="/admin/analytics"
					element={<AdminAnalyticsPage />}
				/>
			</Routes>
		</div>
	)
}

export default App
