import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, CartesianGrid, XAxis, YAxis } from "recharts";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/lib/app-context";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Dashboard() {
  const { marketingData, sharingData, pieData, stats } = useAppData();

  return (
    <div className="min-h-screen bg-[#F3F6FD] pb-20">
      <DashboardHeader />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        
        {/* Stats Cards */}
        <div className="space-y-4">
          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white overflow-hidden">
            <CardContent className="p-7 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-[15px] font-medium text-gray-500">Marketing Data</p>
                <p className="text-[40px] font-bold text-slate-900 leading-none">{stats.marketing.total}</p>
              </div>
              <div className="flex gap-12 text-center pr-4">
                <div className="space-y-1">
                  <p className="text-[13px] text-gray-400">Verified</p>
                  <p className="text-[22px] font-bold text-blue-500 leading-tight">{stats.marketing.verified}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-gray-400">Not Verified</p>
                  <p className="text-[22px] font-bold text-gray-400 leading-tight">{stats.marketing.notVerified}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 w-6 h-6" />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white overflow-hidden">
            <CardContent className="p-7 flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-[15px] font-medium text-gray-500">Sharing Data</p>
                <p className="text-[40px] font-bold text-slate-900 leading-none">{stats.sharing.total}</p>
              </div>
              <div className="flex gap-12 text-center pr-4">
                <div className="space-y-1">
                  <p className="text-[13px] text-gray-400">Verified</p>
                  <p className="text-[22px] font-bold text-blue-500 leading-tight">{stats.sharing.verified}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-gray-400">Not Verified</p>
                  <p className="text-[22px] font-bold text-gray-400 leading-tight">{stats.sharing.notVerified}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 w-6 h-6" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-[17px] font-medium text-slate-900">New Addition of Marketing</CardTitle>
            </CardHeader>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dy={10}
                    interval={3}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2.5} 
                    dot={false}
                    activeDot={{ r: 6, fill: "var(--color-primary)", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-[17px] font-medium text-slate-900">New Addition of Sharing</CardTitle>
            </CardHeader>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sharingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
                    cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2.5} 
                    dot={false}
                    activeDot={{ r: 6, fill: "var(--color-primary)", stroke: "#fff", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="rounded-3xl border-none shadow-[0_4px_24px_rgba(0,0,0,0.02)] bg-white p-7">
            <CardHeader className="p-0 mb-10">
              <CardTitle className="text-[17px] font-medium text-slate-900">Located Zone</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center">
              <div className="h-[220px] w-[220px] relative mb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center White Circle to simulate Donut Chart thicker ring */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-sm" />
              </div>

              <div className="w-full space-y-5">
                <div className="flex justify-between text-[13px] text-gray-400 px-4 mb-3">
                  <span>Zone</span>
                  <div className="flex gap-14 pr-2">
                    <span>Percentage</span>
                    <span>Quantity</span>
                  </div>
                </div>
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-[15px] px-4">
                    <div className="flex items-center gap-3 min-w-[100px]">
                      <div className="w-3.5 h-3.5 rounded-[4px]" style={{ backgroundColor: item.fill }} />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="flex gap-16 w-full justify-end">
                      <span className="text-slate-600 w-20 text-right">{item.value}%</span>
                      <span className="text-slate-900 font-medium w-8 text-right">{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Link href="/located-zone">
          <Button variant="outline" className="w-full h-12 rounded-xl bg-white border border-gray-200 text-slate-900 hover:bg-gray-50 mt-4 cursor-pointer">
            View More
          </Button>
        </Link>

      </main>
    </div>
  );
}
