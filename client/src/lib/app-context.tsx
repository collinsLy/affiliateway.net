import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface DataPoint {
  date: string;
  value: number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  quantity: number;
  fill: string;
}

export interface StatsData {
  total: number;
  verified: number;
  notVerified: number;
}

export interface AppState {
  marketingData: DataPoint[];
  sharingData: DataPoint[];
  pieData: PieDataPoint[];
  fullZoneData: { name: string; quantity: number; percentage: number }[];
  stats: {
    marketing: StatsData;
    sharing: StatsData;
  };
}

interface AppContextType extends AppState {
  updateStats: (category: 'marketing' | 'sharing', data: Partial<StatsData>) => void;
  updatePieData: (index: number, data: Partial<PieDataPoint>) => void;
  updateChartData: (type: 'marketing' | 'sharing', index: number, value: number) => void;
}

// Initial Data
const initialMarketingData = [
  { date: '12-05', value: 0 },
  { date: '12-06', value: 0 },
  { date: '12-07', value: 0.1 },
  { date: '12-08', value: 0 },
  { date: '12-09', value: 0 },
  { date: '12-10', value: 0 },
  { date: '12-11', value: 0.1 },
];

const initialSharingData = [
  { date: '12-05', value: 0 },
  { date: '12-06', value: 0.1 },
  { date: '12-07', value: 0 },
  { date: '12-08', value: 0 },
  { date: '12-09', value: 0 },
  { date: '12-10', value: 0 },
  { date: '12-11', value: 0 },
];

const initialPieData = [
  { name: 'PHL', value: 52.79, quantity: 104, fill: 'var(--color-chart-1)' },
  { name: 'ME_EARTH', value: 16.75, quantity: 33, fill: 'var(--color-chart-2)' },
  { name: 'IND', value: 13.19, quantity: 26, fill: 'var(--color-chart-3)' },
  { name: 'KEN', value: 8.62, quantity: 17, fill: 'var(--color-chart-4)' },
  { name: 'NGA', value: 2.53, quantity: 5, fill: 'var(--color-chart-5)' },
];

const initialFullZoneData = [
  { name: 'PHL', quantity: 104, percentage: 52.79 },
  { name: 'ME_EARTH', quantity: 33, percentage: 16.75 },
  { name: 'IND', quantity: 26, percentage: 13.19 },
  { name: 'KEN', quantity: 17, percentage: 8.62 },
  { name: 'NGA', quantity: 5, percentage: 2.53 },
  { name: 'IDN', quantity: 3, percentage: 1.52 },
  { name: 'PAK', quantity: 3, percentage: 1.52 },
  { name: 'VNM', quantity: 2, percentage: 1.01 },
  { name: 'BGD', quantity: 2, percentage: 1.01 },
  { name: 'MEX', quantity: 1, percentage: 0.50 },
  { name: 'USA', quantity: 1, percentage: 0.50 },
];

const initialStats = {
  marketing: {
    total: 197,
    verified: 197,
    notVerified: 187
  },
  sharing: {
    total: 196,
    verified: 196,
    notVerified: 182
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [marketingData, setMarketingData] = useState<DataPoint[]>(initialMarketingData);
  const [sharingData, setSharingData] = useState<DataPoint[]>(initialSharingData);
  const [pieData, setPieData] = useState<PieDataPoint[]>(initialPieData);
  const [fullZoneData, setFullZoneData] = useState(initialFullZoneData);
  const [stats, setStats] = useState(initialStats);

  const updateStats = (category: 'marketing' | 'sharing', data: Partial<StatsData>) => {
    setStats(prev => ({
      ...prev,
      [category]: { ...prev[category], ...data }
    }));
  };

  const updatePieData = (index: number, data: Partial<PieDataPoint>) => {
    setPieData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], ...data };
      return newData;
    });
  };

  const updateChartData = (type: 'marketing' | 'sharing', index: number, value: number) => {
    const setter = type === 'marketing' ? setMarketingData : setSharingData;
    setter(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], value };
      return newData;
    });
  };

  return (
    <AppContext.Provider value={{
      marketingData,
      sharingData,
      pieData,
      fullZoneData,
      stats,
      updateStats,
      updatePieData,
      updateChartData
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppProvider');
  }
  return context;
}
