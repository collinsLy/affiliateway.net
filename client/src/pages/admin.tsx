import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/lib/app-context";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  const { user, loading, stats, pieData, marketingData, sharingData, updateStats, updatePieData, updateChartData } = useAppData();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  return (
    <div className="min-h-screen bg-[#F3F6FD] pb-20">
      <DashboardHeader />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
        </div>

        {/* Marketing Stats Edit */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Marketing Data Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Total</Label>
                <Input 
                  type="number" 
                  value={stats.marketing.total}
                  onChange={(e) => updateStats('marketing', { total: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Verified</Label>
                <Input 
                  type="number" 
                  value={stats.marketing.verified}
                  onChange={(e) => updateStats('marketing', { verified: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Not Verified</Label>
                <Input 
                  type="number" 
                  value={stats.marketing.notVerified}
                  onChange={(e) => updateStats('marketing', { notVerified: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sharing Stats Edit */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sharing Data Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Total</Label>
                <Input 
                  type="number" 
                  value={stats.sharing.total}
                  onChange={(e) => updateStats('sharing', { total: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Verified</Label>
                <Input 
                  type="number" 
                  value={stats.sharing.verified}
                  onChange={(e) => updateStats('sharing', { verified: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Not Verified</Label>
                <Input 
                  type="number" 
                  value={stats.sharing.notVerified}
                  onChange={(e) => updateStats('sharing', { notVerified: Number(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Zone Edit */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Located Zone Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {pieData.map((item, index) => (
              <div key={item.name} className="grid grid-cols-12 gap-4 items-end border-b pb-4 last:border-0 last:pb-0">
                <div className="col-span-3 space-y-2">
                  <Label className="text-xs text-gray-500">Zone Name</Label>
                  <Input 
                    value={item.name}
                    onChange={(e) => updatePieData(index, { name: e.target.value })}
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label className="text-xs text-gray-500">Percentage (%)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={item.value}
                    onChange={(e) => updatePieData(index, { value: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label className="text-xs text-gray-500">Quantity</Label>
                  <Input 
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updatePieData(index, { quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="col-span-3 flex justify-end pb-2">
                  <div className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: item.fill }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Marketing Chart Data Edit */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Marketing Chart Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {marketingData.map((point, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-6 space-y-2">
                  <Label className="text-xs text-gray-500">Date</Label>
                  <Input value={point.date} readOnly />
                </div>
                <div className="col-span-6 space-y-2">
                  <Label className="text-xs text-gray-500">Value</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={point.value}
                    onChange={(e) => updateChartData('marketing', index, Number(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Sharing Chart Data Edit */}
        <Card className="rounded-2xl border-none shadow-sm">
          <CardHeader>
            <CardTitle>Sharing Chart Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sharingData.map((point, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-6 space-y-2">
                  <Label className="text-xs text-gray-500">Date</Label>
                  <Input value={point.date} readOnly />
                </div>
                <div className="col-span-6 space-y-2">
                  <Label className="text-xs text-gray-500">Value</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={point.value}
                    onChange={(e) => updateChartData('sharing', index, Number(e.target.value))}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
