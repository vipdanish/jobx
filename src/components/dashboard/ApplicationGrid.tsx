import React from "react";
import ApplicationCard from "./ApplicationCard";
import FilterBar from "./FilterBar";
import { addDays } from "date-fns";

type ApplicationStatus = "applied" | "interviewing" | "offered" | "rejected";

interface Application {
  id: string;
  companyName: string;
  companyLogo: string;
  position: string;
  location: string;
  applicationDate: string;
  status: ApplicationStatus;
  progress: number;
}

interface ApplicationGridProps {
  applications?: Application[];
  onFilterChange?: (status: string) => void;
  onDateChange?: (dates: { from: Date; to: Date }) => void;
}

const defaultApplications: Application[] = [
  {
    id: "1",
    companyName: "Tech Corp",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    position: "Senior Developer",
    location: "San Francisco, CA",
    applicationDate: "2024-03-15",
    status: "applied",
    progress: 25,
  },
  {
    id: "2",
    companyName: "Innovation Labs",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=IL",
    position: "Full Stack Engineer",
    location: "New York, NY",
    applicationDate: "2024-03-10",
    status: "interviewing",
    progress: 50,
  },
  {
    id: "3",
    companyName: "Digital Solutions",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=DS",
    position: "Frontend Developer",
    location: "Austin, TX",
    applicationDate: "2024-03-05",
    status: "offered",
    progress: 100,
  },
];

const ApplicationGrid = ({
  applications = defaultApplications,
  onFilterChange = () => {},
  onDateChange = () => {},
}: ApplicationGridProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <FilterBar
        onStatusChange={onFilterChange}
        onDateChange={onDateChange}
        dateRange={{ from: new Date(), to: addDays(new Date(), 30) }}
      />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            companyName={application.companyName}
            companyLogo={application.companyLogo}
            position={application.position}
            location={application.location}
            applicationDate={application.applicationDate}
            status={application.status}
            progress={application.progress}
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationGrid;
