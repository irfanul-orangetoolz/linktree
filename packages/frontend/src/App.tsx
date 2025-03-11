
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ManageLinks from "./pages/ManageLinks";
import PublicProfile from "./pages/PublicProfile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./pages/Analytics";
import ProfilePreview from "./pages/ProfilePreview";
import SocialIntegration from "./pages/SocialIntegration";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<ThemeProvider>
			<AuthProvider>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Index />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<Dashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/profile-preview"
								element={
									<ProtectedRoute>
										<ProfilePreview />
									</ProtectedRoute>
								}
							/>{" "}
							<Route
								path="/social-integration"
								element={
									<ProtectedRoute>
										<SocialIntegration />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/edit-profile"
								element={
									<ProtectedRoute>
										<EditProfile />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/manage-links"
								element={
									<ProtectedRoute>
										<ManageLinks />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/analytics"
								element={
									<ProtectedRoute>
										<Analytics />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/:username"
								element={<PublicProfile />}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</BrowserRouter>
				</TooltipProvider>
			</AuthProvider>
		</ThemeProvider>
	</QueryClientProvider>
)

export default App;
