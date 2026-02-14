import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, UserCircle, Stethoscope, Droplet, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function Landing() {
  const [showAuth, setShowAuth] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'doctor' | 'nurse'>('doctor');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name || 'Medical Professional', role, email || 'user@hospital.com');
    navigate('/dashboard');
  };

  if (!showAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          {/* Logo and Icon */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Droplet className="h-10 w-10 text-white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              MediFlow Alert
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-foreground/80">
              Smart IV Monitoring System
            </p>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time monitoring • Intelligent alerts • Patient safety first
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
              <Activity className="h-8 w-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Live Monitoring</h3>
              <p className="text-sm text-muted-foreground">24/7 real-time fluid level tracking</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
              <Shield className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Smart Alerts</h3>
              <p className="text-sm text-muted-foreground">Intelligent notifications for critical events</p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-success/20 hover:border-success/40 transition-all hover:scale-105">
              <Heart className="h-8 w-8 text-success mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Patient Care</h3>
              <p className="text-sm text-muted-foreground">Enhanced safety and efficiency</p>
            </Card>
          </div>

          {/* CTA Button */}
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            onClick={() => setShowAuth(true)}
          >
            Get Started
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            Join healthcare professionals worldwide in revolutionizing IV monitoring
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-accent/20 p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Card className="w-full max-w-md p-8 space-y-6 relative z-10 bg-card/95 backdrop-blur shadow-2xl">
        <div className="text-center space-y-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAuth(false)}
            className="mb-2"
          >
            ← Back
          </Button>
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg" />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Droplet className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MediFlow Alert
          </h1>
          <p className="text-muted-foreground">
            {isSignIn ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant={role === 'doctor' ? 'default' : 'outline'}
                onClick={() => setRole('doctor')}
                className="w-full"
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                Doctor
              </Button>
              <Button
                type="button"
                variant={role === 'nurse' ? 'default' : 'outline'}
                onClick={() => setRole('nurse')}
                className="w-full"
              >
                <UserCircle className="h-4 w-4 mr-2" />
                Nurse
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-primary hover:underline"
          >
            {isSignIn ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </Card>
    </div>
  );
}
