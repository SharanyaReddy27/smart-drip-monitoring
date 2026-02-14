import { AppLayout } from '@/components/AppLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fluidLevelData = [
  { time: '00:00', device1: 500, device2: 480, device3: 450, device4: 490 },
  { time: '04:00', device1: 400, device2: 420, device3: 380, device4: 380 },
  { time: '08:00', device1: 300, device2: 360, device3: 310, device4: 270 },
  { time: '12:00', device1: 200, device2: 300, device3: 240, device4: 160 },
  { time: '16:00', device1: 150, device2: 240, device3: 180, device4: 100 },
  { time: '20:00', device1: 100, device2: 180, device3: 120, device4: 80 },
];

const alertDistribution = [
  { name: 'Critical', value: 12, color: 'hsl(var(--destructive))' },
  { name: 'Warning', value: 28, color: 'hsl(var(--warning))' },
  { name: 'Info', value: 45, color: 'hsl(var(--primary))' },
];

const deviceUsage = [
  { device: 'IV-001', hours: 142 },
  { device: 'IV-002', hours: 128 },
  { device: 'IV-003', hours: 156 },
  { device: 'IV-004', hours: 134 },
  { device: 'IV-005', hours: 148 },
  { device: 'IV-006', hours: 125 },
];

const Analytics = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            System performance and usage insights
          </p>
        </div>

        <Tabs defaultValue="fluid-levels" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fluid-levels">Fluid Levels</TabsTrigger>
            <TabsTrigger value="alerts">Alert Distribution</TabsTrigger>
            <TabsTrigger value="usage">Device Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="fluid-levels" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">24-Hour Fluid Level Trends</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={fluidLevelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="device1"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Device 1"
                  />
                  <Line
                    type="monotone"
                    dataKey="device2"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Device 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="device3"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Device 3"
                  />
                  <Line
                    type="monotone"
                    dataKey="device4"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    name="Device 4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Alert Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={alertDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {alertDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Alert Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg bg-destructive/10">
                    <span className="font-medium">Critical Alerts</span>
                    <span className="text-2xl font-bold text-destructive">12</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-warning/10">
                    <span className="font-medium">Warning Alerts</span>
                    <span className="text-2xl font-bold text-warning">28</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg bg-primary/10">
                    <span className="font-medium">Info Alerts</span>
                    <span className="text-2xl font-bold text-primary">45</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Alerts (7 days)</span>
                      <span className="text-2xl font-bold">85</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Device Usage Hours (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={deviceUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="device" stroke="hsl(var(--foreground))" />
                  <YAxis stroke="hsl(var(--foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Analytics;
