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

// Initial Data - Empty/Zeroed out as requested
const initialMarketingData = Array(21).fill(0).map((_, i) => ({
  date: `11-${String(i + 6).padStart(2, '0')}`,
  value: 0
}));

const initialSharingData = Array(7).fill(0).map((_, i) => ({
  date: `12-${String(i + 5).padStart(2, '0')}`,
  value: 0
}));

const initialPieData = [
  { name: 'PHL', value: 0, quantity: 0, fill: '#0066FF' },
  { name: 'ME_EARTH', value: 0, quantity: 0, fill: '#00CCFF' },
  { name: 'IND', value: 0, quantity: 0, fill: '#3B82F6' },
  { name: 'KEN', value: 0, quantity: 0, fill: '#1E40AF' },
  { name: 'NGA', value: 0, quantity: 0, fill: '#172554' },
];

const initialFullZoneData = [
  { name: 'PHL', quantity: 0, percentage: 0 },
];

const initialStats = {
  marketing: {
    total: 0,
    verified: 0,
    notVerified: 0
  },
  sharing: {
    total: 0,
    verified: 0,
    notVerified: 0
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
