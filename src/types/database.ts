export interface Application {
  id: string;
  company_name: string;
  company_logo: string;
  position: string;
  location: string;
  application_date: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  progress: number;
  notes: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface ApplicationStats {
  total_applications: number;
  success_rate: number;
  stage_distribution: {
    applied: number;
    interviewing: number;
    offered: number;
    rejected: number;
  };
}
