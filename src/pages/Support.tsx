import { Mail, Phone, MessageCircle, FileText, Video, ExternalLink } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Support ticket submitted',
      description: 'Our team will get back to you within 24 hours.',
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
          <p className="text-muted-foreground mt-1">
            Get help with the IV monitoring system
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Emergency Hotline</h3>
            <p className="text-sm text-muted-foreground mb-4">
              24/7 support for critical issues
            </p>
            <Button variant="outline" className="w-full">
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Response within 24 hours
            </p>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <MessageCircle className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Chat with our support team
            </p>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Start Chat
            </Button>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Submit a Support Ticket</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@hospital.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Provide details about your issue..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Help</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  User Manual
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  FAQ
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">System Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="font-medium">2.4.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update</span>
                  <span className="font-medium">2025-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span className="font-medium">Enterprise</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Support Level</span>
                  <span className="font-medium">24/7 Premium</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Support;
