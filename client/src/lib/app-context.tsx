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
// Matches the "Marketing Data" graph in the original photo: peak around 11-22, max ~30-35
const initialMarketingData = [
  { date: '11-06', value: 2 },
  { date: '11-07', value: 4 },
  { date: '11-08', value: 11 },
  { date: '11-09', value: 6 },
  { date: '11-10', value: 10 },
  { date: '11-11', value: 5 },
  { date: '11-12', value: 8 },
  { date: '11-13', value: 8 },
  { date: '11-14', value: 1 },
  { date: '11-15', value: 0.5 },
  { date: '11-16', value: 1 },
  { date: '11-17', value: 0 },
  { date: '11-18', value: 13 },
  { date: '11-19', value: 11 },
  { date: '11-20', value: 17 },
  { date: '11-21', value: 31 },
  { date: '11-22', value: 12 },
  { date: '11-23', value: 1 },
  { date: '11-24', value: 0 },
  { date: '11-25', value: 0 },
  { date: '11-26', value: 1 },
];

// Matches the "Sharing Data" graph in the original photo: mostly flat 0, peak at start and end?
// Actually looking closely at Photo 1 sharing graph: it's flat 0 from 12-05 to 12-10, then maybe a tiny blip or flat?
// Wait, looking at Photo 1 Sharing Graph again:
// It has Y axis 0, 0.2, 0.4, 0.6, 0.8, 1.
// The line is flat on 0 until 12-10, then maybe a tiny rise? Or just flat.
// Let's look at the "Recreation" feedback which says "Your graphs show different trend lines... Sharing one is also flat but with different time labels".
// The original Sharing graph seems to have data: 12-05 to 12-11.
// The line is basically flat at 0.
const initialSharingData = [
  { date: '12-05', value: 0 },
  { date: '12-06', value: 0 },
  { date: '12-07', value: 0 },
  { date: '12-08', value: 0 },
  { date: '12-09', value: 0 },
  { date: '12-10', value: 0 },
  { date: '12-11', value: 0.05 }, // Tiny blip at end just to show the line exists
];

const initialPieData = [
  { name: 'PHL', value: 52.79, quantity: 104, fill: '#0066FF' }, // Bright Blue
  { name: 'ME_EARTH', value: 16.75, quantity: 33, fill: '#00CCFF' }, // Cyan
  { name: 'IND', value: 13.19, quantity: 26, fill: '#3B82F6' }, // Standard Blue
  { name: 'KEN', value: 8.62, quantity: 17, fill: '#1E40AF' }, // Darker Blue
  { name: 'NGA', value: 2.53, quantity: 5, fill: '#172554' }, // Very Dark Blue
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
