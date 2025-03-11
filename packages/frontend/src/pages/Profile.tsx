import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Link as RouterLink } from "react-router-dom"
import {
	Edit,
	ExternalLink,
	Facebook,
	Globe,
	Instagram,
	Link,
	Linkedin,
	Share2,
	Twitter,
	Youtube
} from "lucide-react"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { getSocialAccounts, getLinks } from "@/services/api"

const Profile = () => {
	const { user } = useAuth()

	if (!user) {
		return null
	}

	const [socialAccounts, setSocialAccounts] = useState([])
	const [links, setLinks] = useState([])
	const [isLoadingSocial, setIsLoadingSocial] = useState(false)
	const [isLoadingLinks, setIsLoadingLinks] = useState(false)

	useEffect(() => {
		const fetchSocialAccounts = async () => {
			if (!user) return

			setIsLoadingSocial(true)
			try {
				const data = await getSocialAccounts()
				setSocialAccounts(data || [])
			} catch (error) {
				console.error("Failed to fetch social accounts:", error)
				toast.error("Failed to load social media accounts")
			} finally {
				setIsLoadingSocial(false)
			}
		}

		const fetchLinks = async () => {
			if (!user) return

			setIsLoadingLinks(true)
			try {
				const data = await getLinks()
				setLinks(data || [])
			} catch (error) {
				console.error("Failed to fetch links:", error)
				toast.error("Failed to load links")
			} finally {
				setIsLoadingLinks(false)
			}
		}

		fetchSocialAccounts()
		fetchLinks()
	}, [user])
	const copyProfileLink = () => {
		navigator.clipboard.writeText(
			`${window.location.origin}/${user.user_name}`
		)
		toast.success("Profile link copied to clipboard!")
	}
	const getPlatformIcon = (platform) => {
		switch (platform.toLowerCase()) {
			case "facebook":
				return <Facebook className="h-5 w-5 text-blue-600" />
			case "twitter":
				return <Twitter className="h-5 w-5 text-blue-400" />
			case "instagram":
				return <Instagram className="h-5 w-5 text-pink-500" />
			case "linkedin":
				return <Linkedin className="h-5 w-5 text-blue-700" />
			case "youtube":
				return <Youtube className="h-5 w-5 text-red-600" />
			default:
				return <Globe className="h-5 w-5 text-gray-500" />
		}
	}
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
				<Card className="shadow-lg">
					<CardHeader className="pb-0">
						<div className="flex justify-between items-center mb-4">
							<CardTitle className="text-2xl">
								Your Profile
							</CardTitle>
							<div className="flex gap-2">
								<Button
									variant="ghost"
									size="sm"
									onClick={copyProfileLink}
								>
									<Share2 className="h-4 w-4 mr-2" /> Share
								</Button>
								<Button variant="ghost" size="sm" asChild>
									<RouterLink
										to={`/${user.user_name}`}
										target="_blank"
									>
										<ExternalLink className="h-4 w-4 mr-2" />{" "}
										View
									</RouterLink>
								</Button>
								<Button variant="outline" size="sm" asChild>
									<RouterLink to="/edit-profile">
										<Edit className="h-4 w-4 mr-2" /> Edit
									</RouterLink>
								</Button>
							</div>
						</div>
						<CardDescription>
							This is how your profile appears to others
						</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="flex flex-col items-center">
							<div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-background shadow-md">
								<img
									src={
										user.profile_image_url ||
										"https://source.unsplash.com/random/300x300/?portrait"
									}
									alt={user.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<h1 className="text-2xl font-bold mb-1">
								{user.name}
							</h1>
							<p className="text-muted-foreground mb-4">
								@{user.user_name}
							</p>

							<div className="w-full max-w-md text-center mb-8">
								{user.bio ? (
									<p>{user.bio}</p>
								) : (
									<p className="text-muted-foreground italic">
										No bio yet. Add one by editing your
										profile.
									</p>
								)}
							</div>

							<div className="w-full max-w-md mb-8">
								<h2 className="text-lg font-semibold mb-4 text-center">
									Your Links
								</h2>

								<div className="space-y-2">
									{isLoadingLinks ? (
										<div className="bg-muted p-4 rounded-md text-center">
											<p className="text-muted-foreground">
												Loading links...
											</p>
										</div>
									) : links.length > 0 ? (
										<div className="space-y-3">
											{links.map((link) => (
												<div
													key={link.id || link.linkId}
													className="flex items-center justify-between bg-muted p-3 rounded-md"
												>
													<div className="flex items-center gap-3">
														<Link className="h-5 w-5 text-primary" />
														<span className="font-medium">
															{link.title}
														</span>
													</div>
													<div className="text-sm text-muted-foreground truncate max-w-[180px]">
														{link.url}
													</div>
												</div>
											))}
											<RouterLink to="/manage-links">
												<Button
													variant="outline"
													className="w-full"
												>
													<Edit className="h-4 w-4 mr-2" />{" "}
													Manage Links
												</Button>
											</RouterLink>
										</div>
									) : (
										<div>
											<div className="bg-muted p-4 rounded-md text-center">
												<p className="text-muted-foreground">
													You haven't added any links
													yet.
												</p>
											</div>
											<RouterLink
												to="/manage-links"
												className="block mt-2"
											>
												<Button
													variant="outline"
													className="w-full"
												>
													<Edit className="h-4 w-4 mr-2" />{" "}
													Manage Links
												</Button>
											</RouterLink>
										</div>
									)}
								</div>
							</div>
							<div className="w-full max-w-md">
								<h2 className="text-lg font-semibold mb-4 text-center">
									Social Media
								</h2>

								{isLoadingSocial ? (
									<div className="bg-muted p-4 rounded-md text-center">
										<p className="text-muted-foreground">
											Loading social accounts...
										</p>
									</div>
								) : socialAccounts.length > 0 ? (
									<div className="space-y-3">
										{socialAccounts.map((account) => (
											<div
												key={account.platform}
												className="flex items-center justify-between bg-muted p-3 rounded-md"
											>
												<div className="flex items-center gap-3">
													{getPlatformIcon(
														account.platform
													)}
													<span className="font-medium capitalize">
														{account.platform}
													</span>
												</div>
												<div className="text-sm text-muted-foreground">
													{account.username ||
														account.profileUrl}
												</div>
											</div>
										))}
										<RouterLink to="/social-integration">
											<Button
												variant="outline"
												className="w-full"
											>
												<Edit className="h-4 w-4 mr-2" />{" "}
												Manage Social Accounts
											</Button>
										</RouterLink>
									</div>
								) : (
									<div className="space-y-3">
										<div className="bg-muted p-4 rounded-md text-center">
											<p className="text-muted-foreground">
												No social media accounts
												connected yet.
											</p>
										</div>
										<RouterLink to="/social-integration">
											<Button
												variant="outline"
												className="w-full"
											>
												<Edit className="h-4 w-4 mr-2" />{" "}
												Connect Social Accounts
											</Button>
										</RouterLink>
									</div>
								)}
							</div>
						</div>
					</CardContent>
					<CardFooter className="flex justify-center pt-0 pb-6">
						<p className="text-center text-xs text-muted-foreground">
							This is a preview of your public profile.{" "}
							<RouterLink
								to={`/${user.user_name}`}
								className="text-primary-500 hover:underline"
								target="_blank"
							>
								Open public view
							</RouterLink>
						</p>
					</CardFooter>
				</Card>
			</main>
		</div>
	)
}

export default Profile
