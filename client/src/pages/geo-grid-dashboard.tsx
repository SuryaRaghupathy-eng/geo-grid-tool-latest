import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Trash2, BarChart3 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function GeoGridDashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/geo-grid/projects")
      .then(res => res.json())
      .then(setProjects)
      .catch(() => setProjects([]));
  }, []);

  const handleDelete = async (projectId: string) => {
    try {
      setDeletingId(projectId);
      const res = await fetch(`/api/geo-grid/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage your Geo Grid campaigns
          </p>
        </div>

        <Link href="/analyze">
          <Button className="gap-2">
            + New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border rounded-lg p-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-lg font-medium mb-2">
            No projects yet
          </h2>

          <p className="text-sm text-muted-foreground mb-6 max-w-md">
            Create your first Geo Grid campaign to start tracking local rankings.
          </p>

          <Link href="/analyze">
            <Button variant="default">
              Create Campaign
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          {projects.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 mb-4 bg-card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{p.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {p.keyword} · {p.location}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {p.website}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm">
                      <div className="text-muted-foreground">Grid</div>
                      <div className="font-medium">
                        {p.grid?.size}, {p.grid?.spacing}
                      </div>
                    </div>
                    <Link href={`/report/${p.id}`}>
                      <Button variant="default" size="sm" className="gap-2" data-testid={`button-view-report-${p.id}`}>
                        <BarChart3 className="w-4 h-4" />
                        View Report
                      </Button>
                    </Link>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-4 flex-shrink-0"
                      data-testid={`button-delete-project-${p.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Project</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{p.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-3 justify-end">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(p.id)}
                        disabled={deletingId === p.id}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deletingId === p.id ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
