import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "geo-grid-projects.json");

function ensureFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }
}

export function updateProject(
  userId: string,
  projectId: string,
  updates: any
) {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  const projects = data[userId] || [];
  const index = projects.findIndex((p: any) => p.id === projectId);

  if (index === -1) return;

  projects[index] = {
    ...projects[index],
    ...updates
  };

  data[userId] = projects;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function deleteProject(
  userId: string,
  projectId: string
) {
  ensureFile();
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

  const projects = data[userId] || [];
  const index = projects.findIndex((p: any) => p.id === projectId);

  if (index === -1) return false;

  projects.splice(index, 1);
  data[userId] = projects;
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return true;
}
