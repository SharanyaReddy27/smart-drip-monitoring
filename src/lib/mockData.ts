export interface IVDevice {
  id: string;
  patientId: string;
  patientName: string;
  roomNumber: string;
  currentLevel: number; // ml
  totalCapacity: number; // ml
  flowRate: number; // ml/hour
  status: 'normal' | 'warning' | 'critical';
  lastUpdate: Date;
  estimatedDepletion: Date;
}

export interface Alert {
  id: string;
  deviceId: string;
  patientName: string;
  roomNumber: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

export const generateMockDevices = (): IVDevice[] => [
  {
    id: 'IV-001',
    patientId: 'P-1234',
    patientName: 'Sarah Johnson',
    roomNumber: '201A',
    currentLevel: 150,
    totalCapacity: 500,
    flowRate: 50,
    status: 'critical',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
  },
  {
    id: 'IV-002',
    patientId: 'P-5678',
    patientName: 'Michael Chen',
    roomNumber: '203B',
    currentLevel: 350,
    totalCapacity: 500,
    flowRate: 75,
    status: 'warning',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 4.6 * 60 * 60 * 1000), // 4.6 hours
  },
  {
    id: 'IV-003',
    patientId: 'P-9012',
    patientName: 'Emily Rodriguez',
    roomNumber: '205C',
    currentLevel: 450,
    totalCapacity: 500,
    flowRate: 25,
    status: 'normal',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours
  },
  {
    id: 'IV-004',
    patientId: 'P-3456',
    patientName: 'David Thompson',
    roomNumber: '207A',
    currentLevel: 75,
    totalCapacity: 500,
    flowRate: 100,
    status: 'critical',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 0.75 * 60 * 60 * 1000), // 45 min
  },
  {
    id: 'IV-005',
    patientId: 'P-7890',
    patientName: 'Lisa Martinez',
    roomNumber: '209B',
    currentLevel: 400,
    totalCapacity: 500,
    flowRate: 50,
    status: 'normal',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
  },
  {
    id: 'IV-006',
    patientId: 'P-2468',
    patientName: 'James Wilson',
    roomNumber: '211C',
    currentLevel: 200,
    totalCapacity: 500,
    flowRate: 60,
    status: 'warning',
    lastUpdate: new Date(),
    estimatedDepletion: new Date(Date.now() + 3.3 * 60 * 60 * 1000), // 3.3 hours
  },
];

export const generateMockAlerts = (): Alert[] => [
  {
    id: 'A-001',
    deviceId: 'IV-001',
    patientName: 'Sarah Johnson',
    roomNumber: '201A',
    type: 'critical',
    message: 'IV fluid level critically low (150ml remaining)',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'A-002',
    deviceId: 'IV-004',
    patientName: 'David Thompson',
    roomNumber: '207A',
    type: 'critical',
    message: 'IV fluid level critically low (75ml remaining)',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'A-003',
    deviceId: 'IV-002',
    patientName: 'Michael Chen',
    roomNumber: '203B',
    type: 'warning',
    message: 'IV fluid level low (350ml remaining)',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    acknowledged: false,
  },
  {
    id: 'A-004',
    deviceId: 'IV-006',
    patientName: 'James Wilson',
    roomNumber: '211C',
    type: 'warning',
    message: 'IV fluid level low (200ml remaining)',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    acknowledged: true,
  },
  {
    id: 'A-005',
    deviceId: 'IV-003',
    patientName: 'Emily Rodriguez',
    roomNumber: '205C',
    type: 'info',
    message: 'Device maintenance scheduled in 24 hours',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    acknowledged: true,
  },
];
