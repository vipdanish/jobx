import { supabase } from "./supabase";
import { Application, ApplicationStats } from "@/types/database";

export async function getApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("application_date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getApplicationStats(): Promise<ApplicationStats> {
  const { data: applications, error } = await supabase
    .from("applications")
    .select("status");

  if (error) throw error;

  const total = applications.length;
  const offered = applications.filter((app) => app.status === "offered").length;
  const stage_distribution = {
    applied: applications.filter((app) => app.status === "applied").length,
    interviewing: applications.filter((app) => app.status === "interviewing")
      .length,
    offered,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  return {
    total_applications: total,
    success_rate: total ? (offered / total) * 100 : 0,
    stage_distribution,
  };
}

export async function createApplication(application: {
  companyName: string;
  position: string;
  location: string;
  applicationDate: Date;
  status: string;
  notes: string;
  company_logo?: string;
  progress?: number;
  user_id?: string;
}): Promise<Application> {
  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        company_name: application.companyName,
        position: application.position,
        location: application.location,
        application_date: application.applicationDate.toISOString(),
        status: application.status,
        notes: application.notes,
        company_logo: application.company_logo,
        progress: application.progress || 25,
        user_id: application.user_id || "default-user",
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateApplication(
  id: string,
  updates: Partial<Application>,
): Promise<Application> {
  const { data, error } = await supabase
    .from("applications")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase.from("applications").delete().eq("id", id);

  if (error) throw error;
}
