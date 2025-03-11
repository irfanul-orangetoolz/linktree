
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, Link as LinkIcon, Share2, Users, Smartphone } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    Showcase Your Social Media Presence
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Connect all your social platforms in one place. Share your content, grow your audience, and track your performance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  {user ? (
                    <Button size="lg" asChild>
                      <Link to="/dashboard">Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  ) : (
                    <>
                      <Button size="lg" asChild>
                        <Link to="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link to="/login">Login</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex-1 relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border">
                  <img 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                    alt="Social Media Dashboard" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                </div>
                <div className="absolute -inset-4 rounded-full bg-primary-500/10 blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-6 bg-accent">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Grow Your Social Presence</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our platform provides all the tools you need to showcase your content across multiple platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <LinkIcon className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Manage Links</h3>
                <p className="text-muted-foreground">
                  Create and organize all your important links in one place with customizable buttons.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social Integration</h3>
                <p className="text-muted-foreground">
                  Connect and display content from all your social media platforms automatically.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Grow Your Audience</h3>
                <p className="text-muted-foreground">
                  Increase followers and engagement with a professional profile page that showcases all your content.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Optimized</h3>
                <p className="text-muted-foreground">
                  Your profile looks great on all devices, ensuring a seamless experience for your audience.
                </p>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-sm border col-span-1 md:col-span-2 lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
                    <p className="text-muted-foreground mb-4">
                      Join thousands of creators who are growing their audience with our platform.
                    </p>
                    <Button asChild>
                      <Link to="/register">Create Your Profile</Link>
                    </Button>
                  </div>
                  <div className="flex-1 rounded-lg overflow-hidden shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                      alt="Creator profile showcase" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Linktree
                </h3>
                <p className="text-muted-foreground max-w-md">
                  The all-in-one platform for creators to showcase their social media presence and manage their links.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-4">Platform</h4>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                    <li><Link to="/login" className="text-muted-foreground hover:text-foreground">Login</Link></li>
                    <li><Link to="/register" className="text-muted-foreground hover:text-foreground">Sign Up</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t">
              <p className="text-center text-muted-foreground text-sm">
                © {new Date().getFullYear()} Linktree. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
