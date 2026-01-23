// js/views/homeownerDashboard.js
import { createCard, createButton, createMetricRow } from "../uiComponents.js";
import { navigate } from "../router.js";

export async function renderHomeownerDashboardView({ root }) {
  root.innerHTML = "";

  const container = document.createElement("section");
  container.className = "dashboard";

  const left = document.createElement("div");
  const
