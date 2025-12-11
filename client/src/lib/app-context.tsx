import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

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
  user: User | null;
  marketingData: DataPoint[];
  sharingData: DataPoint[];
  pieData: PieDataPoint[];
  fullZoneData: { name: string; quantity: number; percentage: number }[];
  stats: {
    marketing: StatsData;
    sharing: StatsData;
  };
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const [marketingData, setMarketingData] = useState<DataPoint[]>(initialMarketingData);
  const [sharingData, setSharingData] = useState<DataPoint[]>(initialSharingData);
  const [pieData, setPieData] = useState<PieDataPoint[]>(initialPieData);
  const [fullZoneData, setFullZoneData] = useState(initialFullZoneData);
  const [stats, setStats] = useState(initialStats);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Data Sync: only subscribe when authenticated
  useEffect(() => {
    const docRef = doc(db, 'dashboard', 'main');

    if (!user) {
      return;
    }

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.marketingData) setMarketingData(data.marketingData);
          if (data.sharingData) setSharingData(data.sharingData);
          if (data.pieData) setPieData(data.pieData);
          if (data.stats) setStats(data.stats);
          if (data.fullZoneData) setFullZoneData(data.fullZoneData);
        } else {
          setDoc(docRef, {
            marketingData: initialMarketingData,
            sharingData: initialSharingData,
            pieData: initialPieData,
            fullZoneData: initialFullZoneData,
            stats: initialStats,
          }).catch(() => {
            // ignore; rules may block writes
          });
        }
      },
      (error) => {
        // Permission denied or other listener errors
        // Keep local state; surface via toast
        try {
          const { toast } = require('@/hooks/use-toast');
          toast.useToast().toast({
            variant: 'destructive',
            title: 'Realtime sync disabled',
            description: error.message || 'Missing or insufficient permissions',
          });
        } catch {}
      }
    );

    return () => unsubscribe();
  }, [user]);


  const updateStats = async (category: 'marketing' | 'sharing', data: Partial<StatsData>) => {
    const newStats = {
      ...stats,
      [category]: { ...stats[category], ...data }
    };
    setStats(newStats);
    try {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Not logged in',
          description: 'Please log in to save changes.'
        });
        return;
      }
      await setDoc(doc(db, 'dashboard', 'main'), { stats: newStats }, { merge: true });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to save stats',
        description: err?.message || 'An unknown error occurred'
      });
    }
  };

  const updatePieData = async (index: number, data: Partial<PieDataPoint>) => {
    const newPieData = [...pieData];
    newPieData[index] = { ...newPieData[index], ...data };
    setPieData(newPieData);
    try {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Not logged in',
          description: 'Please log in to save changes.'
        });
        return;
      }
      await setDoc(doc(db, 'dashboard', 'main'), { pieData: newPieData }, { merge: true });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to save zone data',
        description: err?.message || 'An unknown error occurred'
      });
    }
  };

  const updateChartData = async (type: 'marketing' | 'sharing', index: number, value: number) => {
    const isMarketing = type === 'marketing';
    const currentData = isMarketing ? marketingData : sharingData;
    const newData = [...currentData];
    newData[index] = { ...newData[index], value };
    
    if (isMarketing) setMarketingData(newData);
    else setSharingData(newData);

    try {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Not logged in',
          description: 'Please log in to save changes.'
        });
        return;
      }
      await setDoc(doc(db, 'dashboard', 'main'), { 
        [isMarketing ? 'marketingData' : 'sharingData']: newData 
      }, { merge: true });
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: `Failed to save ${isMarketing ? 'marketing' : 'sharing'} chart`,
        description: err?.message || 'An unknown error occurred'
      });
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      loading,
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
