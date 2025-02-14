import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplicationGrid from "./dashboard/ApplicationGrid";
import AnalyticsSidebar from "./dashboard/AnalyticsSidebar";
import AddApplicationModal from "./dashboard/AddApplicationModal";
import {
  getApplications,
  getApplicationStats,
  createApplication,
} from "@/lib/api";
import { Application, ApplicationStats } from "@/types/database";
import { useToast } from "@/components/ui/use-toast";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [stats, setStats] = React.useState<ApplicationStats | null>(null);
  const { toast } = useToast();

  const fetchData = React.useCallback(async () => {
    if (
      !import.meta.env.VITE_SUPABASE_URL ||
      !import.meta.env.VITE_SUPABASE_ANON_KEY
    ) {
      console.warn("Supabase not configured, using mock data");
      return;
    }
    try {
      const [apps, appStats] = await Promise.all([
        getApplications(),
        getApplicationStats(),
      ]);
      setApplications(apps);
      setStats(appStats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      });
    }
  }, [toast]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold">
                Job Applications
              </h1>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Application
              </Button>
            </div>

            <ApplicationGrid
              applications={applications}
              onFilterChange={(status) => {
                // Filter handling will be implemented in the ApplicationGrid component
              }}
              onDateChange={(dates) => {
                // Date filtering will be implemented in the ApplicationGrid component
              }}
            />
          </div>
        </main>

        <AnalyticsSidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          totalApplications={stats?.total_applications}
          successRate={stats?.success_rate}
          stageDistribution={stats?.stage_distribution}
        />
      </div>

      <AddApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={async (data) => {
          try {
            await createApplication({
              ...data,
              company_logo: `https://api.dicebear.com/7.x/initials/svg?seed=${data.companyName}`,
              progress: 25,
              user_id: "default-user", // Replace with actual user ID when auth is implemented
            });
            await fetchData();
            setIsModalOpen(false);
            toast({
              title: "Success",
              description: "Application added successfully",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to add application",
              variant: "destructive",
            });
          }
        }}
      />
    </div>
  );
};

export default Home;
