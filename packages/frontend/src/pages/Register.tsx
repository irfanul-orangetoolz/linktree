import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { toast } from "sonner"
import Navbar from "@/components/Navbar"
import { Textarea } from "@/components/ui/textarea"

const Register = () => {
	const [email, setEmail] = useState("")
	const [username, setUsername] = useState("")
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [bio, setBio] = useState("")
	const [profilePicUrl, setProfilePicUrl] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const { register } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!email || !username || !password || !confirmPassword) {
			toast.error("Please fill in all fields")
			return
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match")
			return
		}

		// Basic validation
		if (username.length < 3) {
			toast.error("Username must be at least 3 characters long")
			return
		}

		if (password.length < 6) {
			toast.error("Password must be at least 6 characters long")
			return
		}

		setIsLoading(true)

		try {
			await register(email, username, password,bio,profilePicUrl,name)
			navigate("/dashboard")
		} catch (error) {
			// Error is handled in the auth context
			console.error("Registration failed:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<div className="flex-1 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="space-y-1">
						<CardTitle className="text-2xl font-bold">
							Create an account
						</CardTitle>
						<CardDescription>
							Enter your details to create your account
						</CardDescription>
					</CardHeader>
					<form onSubmit={handleSubmit}>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Jone Doe"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="example@example.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">Username</Label>
								<Input
									id="username"
									type="text"
									placeholder="yourname"
									value={username}
									onChange={(e) =>
										setUsername(
											e.target.value
												.toLowerCase()
												.replace(/\s+/g, "")
										)
									}
									required
								/>
								<p className="text-xs text-muted-foreground">
									This will be your profile URL: socialnexus.com/
									{username || "username"}
								</p>
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">Bio</Label>
								<Textarea
									id="username"
									rows={4}
									placeholder="Bio"
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="username">
									Profile Image URL
								</Label>
								<Input
									id="username"
									placeholder="Profile Image"
									type="text"
									value={profilePicUrl}
									onChange={(e) =>
										setProfilePicUrl(e.target.value)
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirmPassword">
									Confirm Password
								</Label>
								<Input
									id="confirmPassword"
									type="password"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									required
								/>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col space-y-4">
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading}
							>
								{isLoading ? "Creating account..." : "Sign Up"}
							</Button>
							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link
									to="/login"
									className="text-primary-500 hover:underline"
								>
									Log in
								</Link>
							</div>
						</CardFooter>
					</form>
				</Card>
			</div>
		</div>
	)
}

export default Register
