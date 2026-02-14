import { useState } from 'react';
import { Filter } from 'lucide-react';
import { AppLayout } from '@/components/AppLayout';
import { AlertCard } from '@/components/AlertCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateMockAlerts, Alert } from '@/lib/mockData';

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>(generateMockAlerts());

  const handleAcknowledge = (alertId: string) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const criticalAlerts = alerts.filter((a) => a.type === 'critical');
  const warningAlerts = alerts.filter((a) => a.type === 'warning');
  const infoAlerts = alerts.filter((a) => a.type === 'info');
  const unacknowledged = alerts.filter((a) => !a.acknowledged);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alert History</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage system alerts
            </p>
          </div>

          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({alerts.length})
            </TabsTrigger>
            <TabsTrigger value="unacknowledged">
              Unacknowledged ({unacknowledged.length})
            </TabsTrigger>
            <TabsTrigger value="critical">
              Critical ({criticalAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="warning">
              Warning ({warningAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="info">
              Info ({infoAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3 mt-6">
            {alerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
              />
            ))}
          </TabsContent>

          <TabsContent value="unacknowledged" className="space-y-3 mt-6">
            {unacknowledged.length > 0 ? (
              unacknowledged.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onAcknowledge={handleAcknowledge}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No unacknowledged alerts</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="critical" className="space-y-3 mt-6">
            {criticalAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
              />
            ))}
          </TabsContent>

          <TabsContent value="warning" className="space-y-3 mt-6">
            {warningAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
              />
            ))}
          </TabsContent>

          <TabsContent value="info" className="space-y-3 mt-6">
            {infoAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onAcknowledge={handleAcknowledge}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Alerts;
