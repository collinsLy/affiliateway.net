import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, CartesianGrid, XAxis, YAxis, Area, AreaChart } from "recharts";
import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAppData } from "@/lib/app-context";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  const { marketingData, sharingData, pieData, stats } = useAppData();
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const normalizedPieData = useMemo(() => {
    const sumValues = pieData.reduce((s, d) => s + (d.value || 0), 0);
    const totalQty = pieData.reduce((s, d) => s + (d.quantity || 0), 0);
    if (Math.round(sumValues) !== 100 && totalQty > 0) {
      return pieData.map((d) => ({
        ...d,
        value: (d.quantity / totalQty) * 100,
      }));
    }
    return pieData;
  }, [pieData]);

  const activeSlice = activeIndex >= 0 ? normalizedPieData[activeIndex] : null;
  const totalPieQuantity = useMemo(
    () => normalizedPieData.reduce((s, d) => s + (d.quantity || 0), 0),
    [normalizedPieData]
  );

  return (
    <div className="min-h-screen bg-[#F3F6FD] pb-20">
      <DashboardHeader />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        
        {/* Stats Cards */}
        <div className="space-y-4">
          <Card className="rounded-[20px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white overflow-hidden">
            <CardContent className="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div className="space-y-2">
                <p className="text-[15px] font-medium text-gray-500">Marketing Data</p>
                <p className="text-[40px] font-semibold text-slate-900 leading-none">{stats.marketing.total}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-12">
                <div className="flex gap-12 text-center pr-4">
                  <div className="space-y-1">
                    <p className="text-[13px] text-gray-400">Verified</p>
                    <p className="text-[22px] font-bold text-[#3B82F6] leading-tight">{stats.marketing.verified}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] text-gray-300">Not Verified</p>
                    <p className="text-[22px] font-bold text-gray-400 leading-tight">{stats.marketing.notVerified}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-300 w-6 h-6 hidden sm:block" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[20px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white overflow-hidden">
            <CardContent className="p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div className="space-y-2">
                <p className="text-[15px] font-medium text-gray-500">Sharing Data</p>
                <p className="text-[40px] font-semibold text-slate-900 leading-none">{stats.sharing.total}</p>
              </div>
              <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto sm:gap-12">
                <div className="flex gap-12 text-center pr-4">
                  <div className="space-y-1">
                    <p className="text-[13px] text-gray-400">Verified</p>
                    <p className="text-[22px] font-bold text-[#3B82F6] leading-tight">{stats.sharing.verified}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[13px] text-gray-300">Not Verified</p>
                    <p className="text-[22px] font-bold text-gray-400 leading-tight">{stats.sharing.notVerified}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-300 w-6 h-6 hidden sm:block" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <Card className="rounded-[20px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7 located-zone">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-[17px] font-medium text-slate-900">New Addition of Marketing</CardTitle>
            </CardHeader>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMarketing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dy={10}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dx={-10}
                    domain={[0, 'dataMax + 10']}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={1.5} 
                    fillOpacity={1} 
                    fill="url(#colorMarketing)" 
                    activeDot={{ r: 5, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[20px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-[17px] font-medium text-slate-900">New Addition of Sharing</CardTitle>
            </CardHeader>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sharingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                   <defs>
                    <linearGradient id="colorSharing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dy={10}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dx={-10}
                    domain={[0, 'dataMax + 10']}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={1.5} 
                    fillOpacity={1} 
                    fill="url(#colorSharing)"
                    activeDot={{ r: 5, fill: "#3B82F6", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-[20px] border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7">
            <CardHeader className="p-0 mb-10">
              <CardTitle className="text-[17px] font-medium text-slate-900">Located Zone</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center">
              <div className="h-[220px] w-[220px] relative mb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={normalizedPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                      activeIndex={activeIndex}
                      onMouseEnter={(_, i) => setActiveIndex(i)}
                      onMouseLeave={() => setActiveIndex(-1)}
                    >
                      {normalizedPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any, _name: any, props: any) => {
                        const v = typeof value === "number" ? value : Number(value);
                        const pct = `${v.toFixed(2)}%`;
                        const qty = props?.payload?.quantity;
                        const label = props?.payload?.name;
                        return [pct, label + (qty !== undefined ? ` • ${qty}` : "")];
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <div className="text-center leading-tight">
                    <div className="text-[16px] font-semibold text-slate-900">
                      {activeSlice ? `${activeSlice.value.toFixed(1)}%` : totalPieQuantity}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {activeSlice ? `${activeSlice.quantity} • ${activeSlice.name}` : 'Total'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full space-y-5">
                <div className="grid grid-cols-12 text-[13px] text-gray-400 px-4 mb-3">
                  <div className="col-span-4">Zone</div>
                  <div className="col-span-4 text-right pr-4">Percentage</div>
                  <div className="col-span-4 text-right">Quantity</div>
                </div>
                {normalizedPieData.map((item) => (
                  <div key={item.name} className="grid grid-cols-12 items-center text-[15px] px-4 zone-row">
                    <div className="col-span-4 flex items-center gap-3">
                      <div className="w-3.5 h-3.5 rounded-[4px]" style={{ backgroundColor: item.fill }} />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="col-span-4 text-right pr-4">
                      <span className="text-slate-600 percentage">{item.value.toFixed(2)}%</span>
                    </div>
                    <div className="col-span-4 text-right">
                      <span className="text-slate-900 quantity">{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
              <CardFooter className="pt-4">
                <Link href="/located-zone" className="w-full">
                  <Button variant="outline" className="w-full h-12 rounded-xl bg-white border border-gray-200 text-slate-900 hover:bg-gray-50">
                    View More
                  </Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
        </div>

      </main>
    </div>
  );
}
