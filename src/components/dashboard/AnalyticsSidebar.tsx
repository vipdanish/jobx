import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, ChevronRight, PieChart } from "lucide-react";

interface AnalyticsSidebarProps {
  totalApplications?: number;
  successRate?: number;
  stageDistribution?: {
    applied: number;
    interviewing: number;
    offered: number;
    rejected: number;
  };
  isOpen?: boolean;
  onToggle?: () => void;
}

const AnalyticsSidebar = ({
  totalApplications = 25,
  successRate = 35,
  stageDistribution = {
    applied: 10,
    interviewing: 8,
    offered: 4,
    rejected: 3,
  },
  isOpen = true,
  onToggle = () => {},
}: AnalyticsSidebarProps) => {
  // Responsive layout handling
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const content = (
    <div className="h-full bg-white p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics</h2>
        <Button variant="ghost" size="icon" onClick={onToggle}>
          <ChevronRight />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">
            Total Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalApplications}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-gray-500">Success Rate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-3xl font-bold">{successRate}%</div>
          <Progress value={successRate} className="h-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm text-gray-500">
            Stage Distribution
          </CardTitle>
          <PieChart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(stageDistribution).map(([stage, count]) => (
            <div key={stage} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{stage}</span>
                <span>{count}</span>
              </div>
              <Progress
                value={(count / totalApplications) * 100}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm text-gray-500">Monthly Trend</CardTitle>
          <BarChart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="fixed bottom-4 right-4 rounded-full shadow-lg"
          >
            <BarChart className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-[312px] border-l h-full overflow-y-auto">
      {content}
    </aside>
  );
};

export default AnalyticsSidebar;
