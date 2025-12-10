import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/lib/app-context";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LocatedZone() {
  const { fullZoneData } = useAppData();

  return (
    <div className="min-h-screen bg-[#F3F6FD] pb-20">
      <DashboardHeader />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
        
        <Card className="rounded-2xl border-none shadow-sm min-h-[600px] flex flex-col">
          <CardHeader className="p-4 flex flex-row items-center border-b border-gray-100">
            <Link href="/dashboard">
              <a className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </a>
            </Link>
            <CardTitle className="flex-1 text-center text-base font-normal text-slate-900 pr-8">
              Located Zone
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0 flex-1">
            <div className="grid grid-cols-12 px-6 py-4 text-xs font-medium text-gray-400">
              <div className="col-span-4">Zone</div>
              <div className="col-span-4 text-center">Quantity</div>
              <div className="col-span-4 text-right">Proportion</div>
            </div>
            
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="px-4 pb-4 space-y-2">
                {fullZoneData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className="grid grid-cols-12 px-2 py-4 items-center bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-4 font-medium text-slate-900 text-sm">
                      {item.name}
                    </div>
                    <div className="col-span-4 text-center text-blue-500 font-medium text-sm">
                      {item.quantity}
                    </div>
                    <div className="col-span-4 text-right text-gray-500 text-sm">
                      {item.percentage.toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}
