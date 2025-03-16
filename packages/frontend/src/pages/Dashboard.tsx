import { useAuth } from "@/contexts/AuthContext"
import Navbar from "@/components/Navbar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
	Eye,
	Link as LinkIcon,
	Share2,
	ExternalLink,
	Edit,
	BarChart,
	Link2
} from "lucide-react"
import { toast } from "sonner"

const Dashboard = () => {
	const { user } = useAuth()

	if (!user) {
		return null
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
				<div className="grid gap-8">
					{/* Welcome section */}
					<section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white rounded-xl p-8 shadow-lg">
						<div className="max-w-2xl">
							<h1 className="text-2xl md:text-3xl font-bold mb-4">
								Welcome back, {user.name}!
							</h1>
							<p className="text-white/80 mb-6">
								Manage your social profile, links, and content
								from your dashboard.
							</p>
							<div className="flex flex-wrap gap-4">
								<Button asChild variant="secondary">
									<Link
										to={`/profile-preview`}
										target="_blank"
									>
										<Eye className="mr-2 h-4 w-4" /> Preview
										Profile
									</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									className="bg-white/10 hover:bg-white/20 border-white/20"
								>
									<Link to="/edit-profile">
										<Edit className="mr-2 h-4 w-4" /> Edit
										Profile
									</Link>
								</Button>
								<Button
									
									variant="outline"
									className="bg-white/10 hover:bg-white/20 border-white/20"
									onClick={() => {
										navigator.clipboard.writeText(
											`${window.location.origin}/${user.user_name}`
										)
										toast(
											"Profile link copied to clipboard!"
										)
									}}
								>
									
										<Share2 className="mr-2 h-4 w-4" /> Share
										Profile
									
								</Button>
							</div>
						</div>
					</section>

					{/* Quick actions */}
					{/* <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Links</CardTitle>
								<CardDescription>
									Manage your content links
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="w-full"
								>
									<Link to="/manage-links">
										<LinkIcon className="mr-2 h-4 w-4" />{" "}
										Manage Links
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Social Integration
								</CardTitle>
								<CardDescription>
									Connect your social accounts
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="w-full"
								>
									<Link to="/social-integration">
										<Link2 className="mr-2 h-4 w-4" />{" "}
										Connect Accounts
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Analytics
								</CardTitle>
								<CardDescription>
									View your profile statistics
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="w-full"
								>
									<Link to="/analytics">
										<BarChart className="mr-2 h-4 w-4" />{" "}
										View Stats
									</Link>
								</Button>
							</CardContent>
						</Card>
					</section> */}

					{/* Additional quick actions */}
					<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Public Profile View
								</CardTitle>
								<CardDescription>
									See how others see your profile
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="w-full"
								>
									<Link
										to={`/${user.user_name}`}
										target="_blank"
									>
										<ExternalLink className="mr-2 h-4 w-4" />{" "}
										Open Profile
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">
									Preview
								</CardTitle>
								<CardDescription>
									Preview before publishing
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									asChild
									variant="outline"
									className="w-full"
								>
									<Link to="/profile-preview">
										<Eye className="mr-2 h-4 w-4" /> Preview
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-lg">Share</CardTitle>
								<CardDescription>
									Share your profile with others
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => {
										navigator.clipboard.writeText(
											`${window.location.origin}/${user.user_name}`
										)
										toast(
											"Profile link copied to clipboard!"
										)
									}}
								>
									<Share2 className="mr-2 h-4 w-4" /> Copy
									Link
								</Button>
							</CardContent>
						</Card>
					</section>

					{/* Profile preview */}
					<section className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card>
							<CardHeader>
								<CardTitle>Profile Preview</CardTitle>
								<CardDescription>
									This is how your profile looks to visitors
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col items-center p-6">
								<div className="w-32 h-32 rounded-full overflow-hidden mb-4">
									<img
										src={
											user.profile_image_url ||
											"https://source.unsplash.com/random/300x300/?portrait"
										}
										alt={user.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<h2 className="text-xl font-bold">
									{user.name}
								</h2>
								<p className="text-muted-foreground mb-4">
									@{user.user_name}
								</p>
								<p className="text-center mb-6">
									{user.bio ||
										"No bio yet. Add one from your profile settings."}
								</p>
								<Button asChild>
									<Link to="/edit-profile" className="w-full">
										Edit Profile
									</Link>
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Getting Started</CardTitle>
								<CardDescription>
									Tips to maximize your profile
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div className="flex gap-3">
										<div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
											1
										</div>
										<div>
											<h3 className="font-medium">
												Complete your profile
											</h3>
											<p className="text-sm text-muted-foreground">
												Add a profile photo, bio, and
												other personal details.
											</p>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
											2
										</div>
										<div>
											<h3 className="font-medium">
												Add your links
											</h3>
											<p className="text-sm text-muted-foreground">
												Add links to your social media,
												website, or other important
												content.
											</p>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
											3
										</div>
										<div>
											<h3 className="font-medium">
												Connect social accounts
											</h3>
											<p className="text-sm text-muted-foreground">
												Link your social media accounts
												to display your content.
											</p>
										</div>
									</div>
									<div className="flex gap-3">
										<div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
											4
										</div>
										<div>
											<h3 className="font-medium">
												Check your analytics
											</h3>
											<p className="text-sm text-muted-foreground">
												Monitor your profile performance
												and visitor insights.
											</p>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</section>
				</div>
			</main>
		</div>
	)
}

export default Dashboard
