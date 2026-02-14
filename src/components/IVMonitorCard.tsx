import { Activity, Droplet, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { IVDevice } from '@/lib/mockData';

interface IVMonitorCardProps {
  device: IVDevice;
}

export function IVMonitorCard({ device }: IVMonitorCardProps) {
  const percentageRemaining = (device.currentLevel / device.totalCapacity) * 100;
  const hoursUntilDepletion = (device.estimatedDepletion.getTime() - Date.now()) / (1000 * 60 * 60);

  const statusConfig = {
    normal: {
      color: 'bg-success',
      textColor: 'text-success',
      label: 'Normal',
      badgeVariant: 'default' as const,
    },
    warning: {
      color: 'bg-warning',
      textColor: 'text-warning',
      label: 'Low',
      badgeVariant: 'secondary' as const,
    },
    critical: {
      color: 'bg-destructive',
      textColor: 'text-destructive',
      label: 'Critical',
      badgeVariant: 'destructive' as const,
    },
  };

  const config = statusConfig[device.status];

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{device.patientName}</h3>
          <p className="text-sm text-muted-foreground">Room {device.roomNumber}</p>
        </div>
        <Badge
          variant={config.badgeVariant}
          className={cn('font-medium', device.status === 'critical' && 'pulse-alert')}
        >
          {config.label}
        </Badge>
      </div>

      {/* Fluid Level */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Fluid Level</span>
          <span className="font-medium">
            {device.currentLevel}ml / {device.totalCapacity}ml
          </span>
        </div>
        <Progress value={percentageRemaining} className="h-3" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Droplet className="h-4 w-4" />
            <span className="text-xs">Flow Rate</span>
          </div>
          <span className="text-sm font-medium">{device.flowRate} ml/h</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-xs">Time Left</span>
          </div>
          <span className="text-sm font-medium">{hoursUntilDepletion.toFixed(1)}h</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span className="text-xs">Device ID</span>
          </div>
          <span className="text-sm font-medium">{device.id}</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-4 border-t flex items-center gap-2">
        <div className={cn('h-2 w-2 rounded-full', config.color, device.status === 'critical' && 'pulse-alert')} />
        <span className="text-xs text-muted-foreground">
          Last updated: {device.lastUpdate.toLocaleTimeString()}
        </span>
      </div>
    </Card>
  );
}
