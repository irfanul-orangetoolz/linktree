import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { getProfilePreview } from "@/services/api"
import Navbar from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
	ExternalLink,
	Copy,
	Check,
	Globe,
	Twitter,
	Instagram,
	Github,
	Youtube,
	Linkedin,
	Facebook
} from "lucide-react"
import { toast } from "sonner"

const getSocialIcon = (platform) => {
	switch (platform.toLowerCase()) {
		case "twitter":
			return <Twitter className="h-4 w-4" />
		case "instagram":
			return <Instagram className="h-4 w-4" />
		case "github":
			return <Github className="h-4 w-4" />
		case "youtube":
			return <Youtube className="h-4 w-4" />
		case "linkedin":
			return <Linkedin className="h-4 w-4" />
		case "facebook":
			return <Facebook className="h-4 w-4" />
		default:
			return <Globe className="h-4 w-4" />
	}
}

const ProfilePreview = () => {
	const { user } = useAuth()
	const [preview, setPreview] = useState(null)
	const [loading, setLoading] = useState(true)
	const [copied, setCopied] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}

		const fetchPreview = async () => {
			try {
				const data = await getProfilePreview()
				setPreview(data)
			} catch (err) {
				toast.error("Failed to load profile preview.")
			} finally {
				setLoading(false)
			}
		}

		fetchPreview()
	}, [user, navigate])

	const copyProfileLink = () => {
		const profileUrl = `${window.location.origin}/${user.user_name}`
		navigator.clipboard.writeText(profileUrl)
		setCopied(true)
		toast.success("Profile link copied to clipboard")
		setTimeout(() => setCopied(false), 2000)
	}

	const openPublicProfile = () => {
		window.open(`/${user.user_name}`, "_blank")
	}

	if (!user) return null

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
				<div className="max-w-md w-full mb-8">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-3xl font-bold">
								Profile Preview
							</h1>
							<p className="text-muted-foreground">
								See how visitors view your profile
							</p>
						</div>
						<div className="flex space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={copyProfileLink}
							>
								{copied ? (
									<Check className="h-4 w-4 mr-2" />
								) : (
									<Copy className="h-4 w-4 mr-2" />
								)}
								{copied ? "Copied" : "Copy Link"}
							</Button>
							<Button size="sm" onClick={openPublicProfile}>
								<ExternalLink className="h-4 w-4 mr-2" /> View
							</Button>
						</div>
					</div>

					<div className=" p-4 rounded-lg mb-6 flex items-center">
						<Globe className="h-5 w-5 text-muted-foreground mr-3" />
						<div className="text-sm">
							<span className="text-muted-foreground">
								Your public profile:
							</span>
							<div className="font-medium">
								{window.location.origin}/{user.user_name}
							</div>
						</div>
					</div>
				</div>

				{loading ? (
					<div className="w-full max-w-md animate-pulse">
						<div className="h-40 bg-muted rounded-lg mb-4"></div>
						<div className="h-8 bg-muted rounded-lg w-3/4 mx-auto mb-4"></div>
						<div className="h-16 bg-muted rounded-lg w-5/6 mx-auto mb-8"></div>
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-12 bg-muted rounded-lg mb-4"
							></div>
						))}
					</div>
				) : (
					<Card className="max-w-md w-full shadow-lg border">
						<CardContent className="p-0">
							<div
								className="flex flex-col items-center pt-8 pb-6 px-6 rounded-t-lg"
								// style={{
								// 	backgroundColor:
								// 		preview?.backgroundColor || "#ffffff",
								// 	color:
								// 		preview?.theme === "dark"
								// 			? "#ffffff"
								// 			: "#000000"
								// }}
							>
								<Avatar className="h-24 w-24 border-4  mb-4">
									<AvatarImage
										src={preview?.profile_image_url}
										alt={preview?.name}
									/>
									<AvatarFallback>
										{preview?.name
											?.slice(0, 2)
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<h2 className="text-2xl font-bold">
									{preview?.name}
								</h2>
								<div className="text-sm opacity-70 mb-2">
									@{preview?.user_name}
								</div>
								{preview?.bio && (
									<p className="text-center opacity-80 text-sm max-w-xs">
										{preview?.bio}
									</p>
								)}
							</div>

							<div className="p-6 pt-3 space-y-3">
								{/* Links */}
								{preview?.Links?.length > 0 ? (
									preview.Links.map((link, index) => (
										<a
											key={index}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className={`block w-full text-center py-2.5 border ${
												preview.buttonStyle ===
												"rounded"
													? "rounded-full"
													: "rounded-md"
											} bg-primary text-primary-foreground hover:bg-primary/90 transition-colors`}
										>
											{link.title}
										</a>
									))
								) : (
									<div className="text-center text-muted-foreground py-4">
										No links added yet
									</div>
								)}

								{/* Social Accounts */}
								{preview?.SocialMediaAccounts?.length > 0 && (
									<div className="border-t pt-4 mt-4">
										<h3 className="text-sm font-medium text-muted-foreground mb-3">
											Connected Accounts
										</h3>
										<div className="space-y-3">
											{preview.SocialMediaAccounts.map(
												(account, index) => (
													<div
														key={index}
														className="flex justify-between items-center"
													>
														<div className="flex items-center">
															{getSocialIcon(
																account.platform
															)}
															<span className="ml-2 capitalize">
																{
																	account.platform
																}
															</span>
														</div>
														<div className="text-sm text-muted-foreground">
															{account.follower_count.toLocaleString()}{" "}
															followers
														</div>
													</div>
												)
											)}
										</div>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				)}
			</main>
		</div>
	)
}

export default ProfilePreview
