import { AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Alert } from '@/lib/mockData';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (id: string) => void;
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  const alertConfig = {
    critical: {
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      borderColor: 'border-destructive/50',
      badgeVariant: 'destructive' as const,
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/50',
      badgeVariant: 'secondary' as const,
    },
    info: {
      icon: Info,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/50',
      badgeVariant: 'default' as const,
    },
  };

  const config = alertConfig[alert.type];
  const Icon = config.icon;

  return (
    <Card
      className={cn(
        'p-4 border-l-4 transition-all',
        config.borderColor,
        config.bgColor,
        !alert.acknowledged && alert.type === 'critical' && 'blink-critical'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('mt-1', config.color)}>
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-medium text-sm">{alert.patientName}</h4>
              <p className="text-xs text-muted-foreground">Room {alert.roomNumber} • {alert.deviceId}</p>
            </div>
            <Badge variant={config.badgeVariant} className="text-xs shrink-0">
              {alert.type.toUpperCase()}
            </Badge>
          </div>

          <p className="text-sm mb-2 font-medium">{alert.message}</p>
          {!alert.acknowledged && alert.type === 'critical' && (
            <p className="text-xs text-destructive font-semibold animate-pulse">
              ⚠️ IMMEDIATE ATTENTION REQUIRED
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {alert.timestamp.toLocaleString()}
            </span>

            {!alert.acknowledged && onAcknowledge && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onAcknowledge(alert.id)}
                className="h-7 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Acknowledge
              </Button>
            )}

            {alert.acknowledged && (
              <Badge variant="outline" className="text-xs">
                <Check className="h-3 w-3 mr-1" />
                Acknowledged
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
