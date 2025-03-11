import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Camera } from "lucide-react"

const EditProfile = () => {
	const { user, updateProfile } = useAuth()
	const navigate = useNavigate()

	const [name, setName] = useState("")
	const [bio, setBio] = useState("")
	const [username, setUsername] = useState("")
	const [profileImage, setProfileImage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (user) {
			setName(user.name || "")
			setBio(user.bio || "")
			setUsername(user.user_name || "")
			setProfileImage(user.profile_image_url || "")
		}
	}, [user])

	if (!user) {
		return null
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (name.trim().length < 2) {
			toast.error("Name must be at least 2 characters")
			return
		}

		if (username.trim().length < 3) {
			toast.error("Username must be at least 3 characters")
			return
		}

		if (bio && bio.length > 150) {
			toast.error("Bio cannot exceed 150 characters")
			return
		}

		setIsLoading(true)

		// In a real app, we'd validate the username is unique here

		try {
			updateProfile({
				name,
				bio,
				user_name: username,
				profile_image_url: profileImage
			})
			navigate("/profile")
		} catch (error) {
			toast.error("Failed to update profile")
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	// Function to handle image upload - in a real app, this would upload to a server
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			// For demo purposes, we're just using a random image
			// In a real app, this would upload the image and return a URL
			const randomParam = Math.random().toString(36).substring(7)
			setProfileImage(
				`https://source.unsplash.com/random/300x300/?portrait&${randomParam}`
			)
		}
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
				<Card>
					<CardHeader>
						<CardTitle>Edit Your Profile</CardTitle>
						<CardDescription>
							Update your profile information and customize how
							others see you
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-6">
							{/* Profile Image */}
							<div className="flex flex-col items-center">
								<div className="relative group">
									<Avatar className="h-24 w-24 cursor-pointer">
										<AvatarImage
											src={profileImage}
											alt={name}
										/>
										<AvatarFallback>
											{name?.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
										<label
											htmlFor="profile-image"
											className="cursor-pointer text-white"
										>
											<Camera className="h-6 w-6" />
										</label>
										<input
											type="file"
											id="profile-image"
											className="hidden"
											accept="image/*"
											onChange={handleImageUpload}
										/>
									</div>
								</div>
								<Label
									htmlFor="profile-image"
									className="mt-2 text-sm cursor-pointer text-primary-500"
								>
									Change profile picture
								</Label>
							</div>

							{/* Personal Information */}
							<div className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="name">Display Name</Label>
									<Input
										id="name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										placeholder="Your display name"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="username">Username</Label>
									<div className="flex">
										<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
											{window.location.host}/
										</span>
										<Input
											id="username"
											value={username}
											onChange={(e) =>
												setUsername(
													e.target.value
														.toLowerCase()
														.replace(/\s+/g, "")
												)
											}
											className="rounded-l-none"
											placeholder="username"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="bio">Bio</Label>
										<span className="text-xs text-muted-foreground">
											{bio.length}/150
										</span>
									</div>
									<Textarea
										id="bio"
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										placeholder="Tell visitors about yourself..."
										rows={4}
										maxLength={150}
									/>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate("/profile")}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? "Saving..." : "Save Changes"}
							</Button>
						</CardFooter>
					</form>
				</Card>
			</main>
		</div>
	)
}

export default EditProfile
