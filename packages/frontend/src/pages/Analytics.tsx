import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { getProfileViews, getLinkClicks, getTopLinks } from "@/services/api"
import Navbar from "@/components/Navbar"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	LineChart,
	BarChart3,
	ExternalLink,
	Eye,
	MousePointerClick,
	TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar
} from "recharts"

const Analytics = () => {
	const { user } = useAuth()
	const [views, setViews] = useState(null)
	const [clicks, setClicks] = useState(null)
	const [topLinks, setTopLinks] = useState([])
	const [loading, setLoading] = useState(true)
	const [activeTab, setActiveTab] = useState("overview")
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}

		const fetchAnalytics = async () => {
			try {
				const [viewsData, clicksData, topLinksData] = await Promise.all(
					[getProfileViews(), getLinkClicks(), getTopLinks()]
				)
				setViews(viewsData)
				setClicks(clicksData)
				setTopLinks(topLinksData)
			} catch (err) {
				toast.error("Failed to load analytics data.")
			} finally {
				setLoading(false)
			}
		}

		fetchAnalytics()
	}, [user, navigate])

	// Format chart data for views over time
	const formatViewsChartData = (viewsData) => {
		if (!viewsData?.viewsOverTime) return []
		return viewsData.viewsOverTime.map((view) => ({
			date: view.date,
			views: view.count
		}))
	}

	// Format chart data for link performance
	const formatLinkPerformanceData = (clicksData) => {
		if (!clicksData?.clicksPerLink) return []
		return clicksData.clicksPerLink.map((link) => ({
			name: link.title,
			clicks: link.clickCount
		}))
	}
	if (!user) return null

	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-6xl mx-auto px-4 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold">Analytics</h1>
					<p className="text-muted-foreground">
						Track your profile performance and audience engagement
					</p>
				</div>

				<div className="flex border-b mb-6">
					<Button
						variant="link"
						className={`pb-2 rounded-none ${
							activeTab === "overview"
								? "border-b-2 border-primary"
								: ""
						}`}
						onClick={() => setActiveTab("overview")}
					>
						Overview
					</Button>
					<Button
						variant="link"
						className={`pb-2 rounded-none ${
							activeTab === "views"
								? "border-b-2 border-primary"
								: ""
						}`}
						onClick={() => setActiveTab("views")}
					>
						Profile Views
					</Button>
					<Button
						variant="link"
						className={`pb-2 rounded-none ${
							activeTab === "clicks"
								? "border-b-2 border-primary"
								: ""
						}`}
						onClick={() => setActiveTab("clicks")}
					>
						Link Clicks
					</Button>
				</div>

				{loading ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[1, 2, 3].map((i) => (
							<Card key={i} className="h-32 animate-pulse">
								<CardContent className="p-6 flex items-center justify-center h-full">
									<div className="h-12 w-full bg-muted rounded"></div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<>
						{activeTab === "overview" && (
							<>
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{views?.totalViews.toLocaleString()}
											</CardTitle>
											<CardDescription>
												Total Profile Views
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="text-sm text-muted-foreground">
												<span className="text-green-500">
													+{views?.viewsToday}
												</span>{" "}
												today
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{clicks?.totalClicks.toLocaleString()}
											</CardTitle>
											<CardDescription>
												Total Link Clicks
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="text-sm text-muted-foreground">
												<span className="text-green-500">
													+{clicks?.clicksToday}
												</span>{" "}
												today
											</div>
										</CardContent>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{(
													(clicks?.totalClicks ||
														0 / views?.totalViews ||
														0) * 100
												).toFixed(1) || 0}
												%
											</CardTitle>
											<CardDescription>
												Click-through Rate
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="text-sm text-muted-foreground">
												Avg. engagement per visitor
											</div>
										</CardContent>
									</Card>
								</div>

								<Card className="mb-8">
									<CardHeader>
										<CardTitle>
											Top Performing Links
										</CardTitle>
										<CardDescription>
											Links with the highest click rates
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{topLinks.map((link) => (
												<div
													key={link.linkId}
													className="flex items-center justify-between"
												>
													<div className="flex items-center">
														<div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
															<ExternalLink className="h-4 w-4" />
														</div>
														<div>
															<div className="font-medium">
																{link.title}
															</div>
															<div className="text-sm text-muted-foreground">
																{
																	link.clickCount
																}{" "}
																clicks (
																{link.clickRate}{" "}
																CTR)
															</div>
														</div>
													</div>
													<TrendingUp className="h-4 w-4 text-green-500" />
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
									<Card className="col-span-1">
										<CardHeader>
											<CardTitle>
												Views Over Time
											</CardTitle>
											<CardDescription>
												Daily profile views in the last
												week
											</CardDescription>
										</CardHeader>
										<CardContent className="h-80">
											<ResponsiveContainer
												width="100%"
												height="100%"
											>
												<AreaChart
													data={formatViewsChartData(
														views
													)}
													margin={{
														top: 10,
														right: 10,
														left: 0,
														bottom: 0
													}}
												>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis dataKey="date" />
													<YAxis />
													<Tooltip />
													<Area
														type="monotone"
														dataKey="views"
														stroke="#8B5CF6"
														fill="#8B5CF6"
														fillOpacity={0.2}
													/>
												</AreaChart>
											</ResponsiveContainer>
										</CardContent>
									</Card>

									<Card className="col-span-1">
										<CardHeader>
											<CardTitle>
												Link Performance
											</CardTitle>
											<CardDescription>
												Click distribution across your
												links
											</CardDescription>
										</CardHeader>
										<CardContent className="h-80">
											<ResponsiveContainer
												width="100%"
												height="100%"
											>
												<BarChart
													data={formatLinkPerformanceData(
														clicks
													)}
													layout="vertical"
													margin={{
														top: 5,
														right: 30,
														left: 20,
														bottom: 5
													}}
												>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis type="number" />
													<YAxis
														dataKey="name"
														type="category"
														width={100}
													/>
													<Tooltip />
													<Bar
														dataKey="clicks"
														fill="#8B5CF6"
													/>
												</BarChart>
											</ResponsiveContainer>
										</CardContent>
									</Card>
								</div>
							</>
						)}

						{activeTab === "views" && (
							<>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{views?.totalViews.toLocaleString()}
											</CardTitle>
											<CardDescription>
												Total Views
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{views?.todayViews}
											</CardTitle>
											<CardDescription>
												Today
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{views?.thisWeekViews}
											</CardTitle>
											<CardDescription>
												This Week
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{views?.thisMonthViews}
											</CardTitle>
											<CardDescription>
												This Month
											</CardDescription>
										</CardHeader>
									</Card>
								</div>

								<Card>
									<CardHeader>
										<CardTitle>Views Over Time</CardTitle>
										<CardDescription>
											Daily profile view counts
										</CardDescription>
									</CardHeader>
									<CardContent className="p-6">
										{/* <div className="text-sm mb-4">
											<span className="font-medium">
												Insight:
											</span>{" "}
											Your profile views increased by
											<span className="text-green-500 font-medium">
												{" "}
												24%
											</span>{" "}
											over the last week.
										</div> */}
										<div className="h-80">
											<ResponsiveContainer
												width="100%"
												height="100%"
											>
												<AreaChart
													data={formatViewsChartData(
														views
													)}
													margin={{
														top: 10,
														right: 10,
														left: 0,
														bottom: 0
													}}
												>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis dataKey="date" />
													<YAxis />
													<Tooltip />
													<Area
														type="monotone"
														dataKey="views"
														stroke="#8B5CF6"
														fill="#8B5CF6"
														fillOpacity={0.2}
													/>
												</AreaChart>
											</ResponsiveContainer>
										</div>
									</CardContent>
								</Card>
							</>
						)}

						{activeTab === "clicks" && (
							<>
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{clicks?.totalClicks.toLocaleString()}
											</CardTitle>
											<CardDescription>
												Total Clicks
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{clicks?.todayClicks}
											</CardTitle>
											<CardDescription>
												Today
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{clicks?.thisWeekClicks}
											</CardTitle>
											<CardDescription>
												This Week
											</CardDescription>
										</CardHeader>
									</Card>

									<Card>
										<CardHeader className="pb-2">
											<CardTitle className="text-2xl">
												{clicks?.thisMonthClicks}
											</CardTitle>
											<CardDescription>
												This Month
											</CardDescription>
										</CardHeader>
									</Card>
								</div>

								<Card>
									<CardHeader>
										<CardTitle>Clicks Per Link</CardTitle>
										<CardDescription>
											Performance of individual links
										</CardDescription>
									</CardHeader>
									<CardContent>
										{clicks?.clicksPerLink.map(
											(link, index) => (
												<div
													key={link.linkId}
													className={`flex justify-between py-3 ${
														index !==
														clicks.clicksPerLink
															.length -
															1
															? "border-b"
															: ""
													}`}
												>
													<div className="flex items-center">
														<div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3">
															<MousePointerClick className="h-4 w-4" />
														</div>
														<span>
															{link.title}
														</span>
													</div>
													<div className="font-medium">
														{link.clickCount} clicks
													</div>
												</div>
											)
										)}
									</CardContent>
								</Card>
							</>
						)}
					</>
				)}
			</main>
		</div>
	)
}

export default Analytics
