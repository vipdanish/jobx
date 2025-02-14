import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Building2, ArrowUpRight } from "lucide-react";

type ApplicationStatus = "applied" | "interviewing" | "offered" | "rejected";

interface ApplicationCardProps {
  companyName?: string;
  companyLogo?: string;
  position?: string;
  location?: string;
  applicationDate?: string;
  status?: ApplicationStatus;
  progress?: number;
}

const getStatusColor = (status: ApplicationStatus) => {
  const colors = {
    applied: "bg-blue-100 text-blue-800",
    interviewing: "bg-yellow-100 text-yellow-800",
    offered: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status];
};

const ApplicationCard = ({
  companyName = "Example Company",
  companyLogo = "https://api.dicebear.com/7.x/initials/svg?seed=EC",
  position = "Software Engineer",
  location = "San Francisco, CA",
  applicationDate = "2024-03-15",
  status = "applied",
  progress = 25,
}: ApplicationCardProps) => {
  return (
    <Card className="w-full max-w-[380px] bg-white hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={companyLogo} alt={companyName} />
              <AvatarFallback>{companyName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{companyName}</h3>
              <p className="text-sm text-gray-500">{position}</p>
            </div>
          </div>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          <span>Applied: {applicationDate}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Application Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Building2 size={16} />
          Company Details
        </Button>
        <Button size="sm" className="flex items-center gap-2">
          View Application
          <ArrowUpRight size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
