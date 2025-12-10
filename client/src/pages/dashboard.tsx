import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/lib/app-context";
import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChevronRight, Settings } from "lucide-react";
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
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Marketing Data</p>
                <p className="text-4xl font-bold text-slate-900">{stats.marketing.total}</p>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Verified</p>
                  <p className="text-xl font-semibold text-blue-500">{stats.marketing.verified}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Not Verified</p>
                  <p className="text-xl font-semibold text-gray-400">{stats.marketing.notVerified}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Sharing Data</p>
                <p className="text-4xl font-bold text-slate-900">{stats.sharing.total}</p>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Verified</p>
                  <p className="text-xl font-semibold text-blue-500">{stats.sharing.verified}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Not Verified</p>
                  <p className="text-xl font-semibold text-gray-400">{stats.sharing.notVerified}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300" />
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <Card className="rounded-2xl border-none shadow-sm p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-base font-normal text-slate-900">New Addition of Marketing</CardTitle>
            </CardHeader>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketingData}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-2">
                {marketingData.map((d) => <span key={d.date}>{d.date}</span>)}
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-base font-normal text-slate-900">New Addition of Sharing</CardTitle>
            </CardHeader>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sharingData}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 4, fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 px-2">
                {sharingData.map((d) => <span key={d.date}>{d.date}</span>)}
              </div>
            </div>
          </Card>

          <Card className="rounded-2xl border-none shadow-sm p-6">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-base font-normal text-slate-900">Located Zone</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center">
              <div className="h-[200px] w-[200px] relative mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
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
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-sm" />
              </div>

              <div className="w-full space-y-4">
                <div className="flex justify-between text-xs text-gray-400 px-4 mb-2">
                  <span>Zone</span>
                  <div className="flex gap-12">
                    <span>Percentage</span>
                    <span>Quantity</span>
                  </div>
                </div>
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm px-4">
                    <div className="flex items-center gap-2 min-w-[100px]">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.fill }} />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="flex gap-16 w-full justify-end">
                      <span className="text-slate-600 w-16 text-right">{item.value}%</span>
                      <span className="text-slate-900 font-medium w-8 text-right">{item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Button variant="outline" className="w-full h-12 rounded-xl bg-white border border-gray-200 text-slate-900 hover:bg-gray-50 mt-4">
          View More
        </Button>

      </main>
    </div>
  );
}
