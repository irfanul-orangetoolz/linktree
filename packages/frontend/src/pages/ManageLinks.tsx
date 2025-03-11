import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	AlertCircle,
	Archive,
	ArrowDown,
	ArrowUp,
	Edit2,
	ExternalLink,
	Globe,
	LinkIcon,
	Plus,
	RotateCcw,
	Trash2
} from "lucide-react"
import { toast } from "sonner"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog"
import LinkCard, { LinkItem } from "@/components/LinkCard"
import { useAuth } from "@/contexts/AuthContext"
import {
	getLinks,
	addLink,
	updateLink,
	deleteLink,
	setLinkPriority,
	archiveLink
} from "../services/api"
import { useNavigate } from "react-router-dom"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader
} from "@/components/ui/alert-dialog"
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog"
const ManageLinks = () => {
	const { user } = useAuth()
	const [links, setLinks] = useState<LinkItem[]>([])
	const [loading, setLoading] = useState(true)
	const [openDialog, setOpenDialog] = useState(false)
	const [dialogMode, setDialogMode] = useState("add") // "add" or "edit"
	const [currentLink, setCurrentLink] = useState<Partial<LinkItem>>()
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [linkToDelete, setLinkToDelete] = useState(null)
	const [validationError, setValidationError] = useState("")
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/login")
			return
		}

		fetchLinks()
	}, [user, navigate])

	const fetchLinks = async () => {
		try {
			const data = await getLinks()
			setLinks(data)
		} catch (err) {
		} finally {
			setLoading(false)
		}
	}

	const handleOpenAddDialog = () => {
		setCurrentLink({ title: "", url: "" })
		setDialogMode("add")
		setValidationError("")
		setOpenDialog(true)
	}

	const handleOpenEditDialog = (link) => {
		setCurrentLink({ ...link })
		setDialogMode("edit")
		setValidationError("")
		setOpenDialog(true)
	}

	const validateUrl = (url) => {
		if (!url) return false

		// Add https:// if no protocol is specified
		if (!/^https?:\/\//i.test(url)) {
			return `https://${url}`
		}

		return url
	}

	const handleSaveLink = async () => {
		if (!currentLink.title.trim()) {
			setValidationError("Please enter a title for your link")
			return
		}

		if (!currentLink.url.trim()) {
			setValidationError("Please enter a URL for your link")
			return
		}

		const validatedUrl = validateUrl(currentLink.url)
		if (!validatedUrl) {
			setValidationError("Please enter a valid URL")
			return
		}

		try {
			if (dialogMode === "add") {
				// In a real app, this would call the API
				// await addLink({ title: currentLink.title, url: validatedUrl });
				const newLink = {
					title: currentLink.title,
					url: validatedUrl,
					priority: 0,
					is_archived: false
				}
				await addLink(newLink)
				setLinks([...links, newLink])
				toast.success("Link added successfully")
			} else {
				// In a real app, this would call the API
				// await updateLink(currentLink.linkId, { title: currentLink.title, url: validatedUrl });
				setLinks(
					links.map((link) =>
						link.id === currentLink.id
							? {
									...link,
									title: currentLink.title,
									url: validatedUrl
							  }
							: link
					)
				)
				await updateLink(currentLink.id, currentLink)
				toast.success("Link updated successfully")
			}
			setOpenDialog(false)
		} catch (err) {
			toast.error(
				dialogMode === "add"
					? "Failed to add link"
					: "Failed to update link"
			)
		}
	}

	const handleDeleteClick = (link) => {
		setLinkToDelete(link)
		setOpenDeleteDialog(true)
	}

	const handleConfirmDelete = async () => {
		try {
			// In a real app, this would call the API
			// await deleteLink(linkToDelete.linkId);
			setLinks(links.filter((link) => link.id !== linkToDelete.id))
			await deleteLink(linkToDelete.id)
			toast.success("Link deleted successfully")
			setOpenDeleteDialog(false)
		} catch (err) {
			toast.error("Failed to delete link")
		}
	}

	const handleChangePriority = async (linkId, priority) => {
		await setLinkPriority(linkId, priority)
		setLinks(
			links.map((link) =>
				link.id === linkId
					? {
							...link,
							priority
					  }
					: link
			)
		)
		await fetchLinks()
		toast.success("Link order updated")

		// In a real app, this would call the API
		// await setLinkPriority(linkId, newPriority);
	}

	const handleToggleArchive = async (linkId, is_archived) => {
		try {
			// In a real app, this would call the API
			// await archiveLink(link.linkId, !link.isArchived);
			await archiveLink(linkId, !is_archived)
			fetchLinks()
			toast.success(is_archived ? "Link restored" : "Link archived")
		} catch (err) {
			toast.error("Failed to update link")
		}
	}

	const activeLinks = links
		.filter((link) => !link.is_archived)
		.sort((a, b) => b.priority - a.priority)
	const archivedLinks = links.filter((link) => link.is_archived)

	if (!user) return null
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h1 className="text-3xl font-bold">Manage Links</h1>
						<p className="text-muted-foreground">
							Add, edit and organize the links on your profile
						</p>
					</div>
					<Button onClick={handleOpenAddDialog}>
						<Plus className="mr-2 h-4 w-4" /> Add Link
					</Button>
				</div>

				{loading ? (
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<Card key={i} className="animate-pulse">
								<CardContent className="p-6 flex items-center justify-between">
									<div className="flex-1">
										<div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
										<div className="h-4 bg-muted rounded w-1/2"></div>
									</div>
									<div className="h-9 w-36 bg-muted rounded"></div>
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					<>
						{activeLinks.length === 0 &&
						archivedLinks.length === 0 ? (
							<Card>
								<CardContent className="p-8 flex flex-col items-center justify-center">
									<ExternalLink className="h-12 w-12 text-muted-foreground mb-4" />
									<h3 className="text-xl font-semibold mb-2">
										No links yet
									</h3>
									<p className="text-muted-foreground text-center mb-6 max-w-md">
										Add links to your social media profiles,
										website, or any other content you want
										to share.
									</p>
									<Button onClick={handleOpenAddDialog}>
										<Plus className="mr-2 h-4 w-4" /> Add
										Your First Link
									</Button>
								</CardContent>
							</Card>
						) : (
							<>
								<div className="mb-2 text-sm text-muted-foreground">
									{activeLinks.length} active links •{" "}
									{archivedLinks.length} archived
								</div>

								{activeLinks.length > 0 && (
									<div className="space-y-3 mb-8">
										{activeLinks.map((link, index) => (
											<Card
												key={link.id}
												className="overflow-hidden"
											>
												<div className="flex items-stretch">
													<div className="flex items-center px-4 bg-muted">
														<span className="font-medium text-lg text-muted-foreground">
															{index + 1}
														</span>
													</div>
													<CardContent className="p-4 flex-1 flex items-center justify-between">
														<div className="flex-1 min-w-0">
															<h3 className="font-medium truncate">
																{link.title}
															</h3>
															<div className="flex items-center text-sm text-muted-foreground truncate">
																<Globe className="h-3 w-3 mr-1 flex-shrink-0" />
																<span className="truncate">
																	{link.url}
																</span>
															</div>
														</div>
														<div className="flex items-center space-x-1 ml-4">
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleChangePriority(
																		link.id,
																		link.priority +
																			1
																	)
																}
																disabled={
																	index === 0
																}
															>
																<ArrowUp className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleChangePriority(
																		link.id,
																		link.priority -
																			1
																	)
																}
																disabled={
																	index ===
																	activeLinks.length -
																		1
																}
															>
																<ArrowDown className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleOpenEditDialog(
																		link
																	)
																}
															>
																<Edit2 className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleToggleArchive(
																		link.id,
																		link.is_archived
																	)
																}
															>
																<Archive className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-destructive hover:text-destructive"
																onClick={() =>
																	handleDeleteClick(
																		link
																	)
																}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</CardContent>
												</div>
											</Card>
										))}
									</div>
								)}

								{archivedLinks.length > 0 && (
									<div>
										<h3 className="text-lg font-medium mb-3">
											Archived Links
										</h3>
										<div className="space-y-3">
											{archivedLinks.map((link) => (
												<Card
													key={link.id}
													className="overflow-hidden bg-muted/40"
												>
													<CardContent className="p-4 flex items-center justify-between">
														<div className="flex-1 min-w-0">
															<h3 className="font-medium text-muted-foreground truncate">
																{link.title}
															</h3>
															<div className="flex items-center text-sm text-muted-foreground truncate">
																<Globe className="h-3 w-3 mr-1 flex-shrink-0" />
																<span className="truncate">
																	{link.url}
																</span>
															</div>
														</div>
														<div className="flex items-center space-x-1 ml-4">
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleToggleArchive(
																		link.id, link.is_archived
																	)
																}
															>
																<RotateCcw className="h-4 w-4" />
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-destructive hover:text-destructive"
																onClick={() =>
																	handleDeleteClick(
																		link
																	)
																}
															>
																<Trash2 className="h-4 w-4" />
															</Button>
														</div>
													</CardContent>
												</Card>
											))}
										</div>
									</div>
								)}
							</>
						)}
					</>
				)}

				{/* Add/Edit Link Dialog */}
				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{dialogMode === "add"
									? "Add New Link"
									: "Edit Link"}
							</DialogTitle>
							<DialogDescription>
								{dialogMode === "add"
									? "Add a new link to display on your profile."
									: "Update your link details below."}
							</DialogDescription>
						</DialogHeader>

						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="title">Link Title</Label>
								<Input
									id="title"
									value={currentLink?.title || ""}
									onChange={(e) =>
										setCurrentLink({
											...currentLink,
											title: e.target.value
										})
									}
									placeholder="e.g., My Website"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="url">URL</Label>
								<Input
									id="url"
									value={currentLink?.url}
									onChange={(e) =>
										setCurrentLink({
											...currentLink,
											url: e.target.value
										})
									}
									placeholder="e.g., https://example.com"
								/>
								<p className="text-xs text-muted-foreground">
									URLs without https:// will automatically be
									prefixed
								</p>
							</div>

							{validationError && (
								<div className="text-destructive text-sm flex items-center gap-2">
									<AlertCircle className="h-4 w-4" />
									{validationError}
								</div>
							)}
						</div>

						<DialogFooter>
							<Button
								variant="outline"
								onClick={() => setOpenDialog(false)}
							>
								Cancel
							</Button>
							<Button onClick={handleSaveLink}>
								{dialogMode === "add"
									? "Add Link"
									: "Save Changes"}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* Delete Confirmation Dialog */}
				<AlertDialog
					open={openDeleteDialog}
					onOpenChange={setOpenDeleteDialog}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This will permanently delete this link. This
								action cannot be undone.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleConfirmDelete}
								className="bg-destructive text-destructive-foreground"
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</main>
		</div>
	)
}

export default ManageLinks
