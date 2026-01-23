// js/controllers/dashboardController.js
import { renderHomeownerDashboardView } from "../views/homeownerDashboard.js";
import { renderRooferDashboardView } from "../views/rooferDashboard.js";

export function showHomeownerDashboard(root) {
  return renderHomeownerDashboardView({ root });
}

export function showRooferDashboard(root) {
  return renderRooferDashboardView({ root });
}
