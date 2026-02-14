import { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { IVMonitorCard } from '@/components/IVMonitorCard';
import { AlertCard } from '@/components/AlertCard';
import { StatCard } from '@/components/StatCard';
import { UserProfile } from '@/components/UserProfile';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { generateMockDevices, generateMockAlerts, IVDevice, Alert } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [devices, setDevices] = useState<IVDevice[]>(generateMockDevices());
  const [alerts, setAlerts] = useState<Alert[]>(generateMockAlerts());
  const [simulationMode, setSimulationMode] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Simulate real-time updates
  useEffect(() => {
    if (!simulationMode) return;

    const interval = setInterval(() => {
      setDevices((prevDevices) =>
        prevDevices.map((device) => {
          const newLevel = Math.max(0, device.currentLevel - device.flowRate / 60);
          const percentage = (newLevel / device.totalCapacity) * 100;
          
          let newStatus: 'normal' | 'warning' | 'critical' = 'normal';
          if (percentage < 15) newStatus = 'critical';
          else if (percentage < 40) newStatus = 'warning';

          return {
            ...device,
            currentLevel: Math.round(newLevel),
            status: newStatus,
            lastUpdate: new Date(),
            estimatedDepletion: new Date(
              Date.now() + (newLevel / device.flowRate) * 60 * 60 * 1000
            ),
          };
        })
      );
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [simulationMode]);

  const criticalCount = devices.filter((d) => d.status === 'critical').length;
  const warningCount = devices.filter((d) => d.status === 'warning').length;
  const normalCount = devices.filter((d) => d.status === 'normal').length;
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).length;

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  if (!user) return null;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* User Profile */}
        <UserProfile />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Real-time IV fluid monitoring and alerts
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
            <Switch
              id="simulation-mode"
              checked={simulationMode}
              onCheckedChange={setSimulationMode}
            />
            <Label htmlFor="simulation-mode" className="cursor-pointer">
              <span className="font-medium">Simulation Mode</span>
              <span className="text-xs text-muted-foreground block">
                Auto-update fluid levels
              </span>
            </Label>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Devices"
            value={devices.length}
            icon={Activity}
          />
          <StatCard
            title="Critical Alerts"
            value={criticalCount}
            icon={AlertCircle}
            className="border-l-4 border-destructive"
          />
          <StatCard
            title="Warnings"
            value={warningCount}
            icon={Clock}
            className="border-l-4 border-warning"
          />
          <StatCard
            title="Normal Status"
            value={normalCount}
            icon={CheckCircle}
            className="border-l-4 border-success"
          />
        </div>

        {/* Critical Alerts Section */}
        {unacknowledgedAlerts > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Active Alerts</h2>
              <span className="text-sm text-muted-foreground">
                {unacknowledgedAlerts} unacknowledged
              </span>
            </div>
            <div className="grid gap-3">
              {alerts
                .filter((alert) => !alert.acknowledged)
                .slice(0, 3)
                .map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onAcknowledge={handleAcknowledge}
                  />
                ))}
            </div>
            {unacknowledgedAlerts > 3 && (
              <Button variant="outline" className="w-full">
                View All Alerts ({unacknowledgedAlerts})
              </Button>
            )}
          </div>
        )}

        {/* IV Monitors Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">IV Monitors</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <IVMonitorCard key={device.id} device={device} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
