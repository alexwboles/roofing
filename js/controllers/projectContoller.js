// js/controllers/projectController.js
import { renderProjectDashboardView } from "../views/projectDashboard.js";

export function showProjectDashboard(root) {
  return renderProjectDashboardView({ root });
}
