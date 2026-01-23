// js/views/projectDashboard.js
// Project detail dashboard with AI roof details surfaced

import { createCard, createButton, createMetricRow } from "../uiComponents.js";

export async function renderProjectDashboardView({ root }) {
  root.innerHTML = "";

  const stored = sessionStorage.getItem("roofAnalysis");
  const analysis = stored ? JSON.parse(stored).analysis : null;
  const address = stored ? JSON.parse(stored).address : "";

  const container = document.createElement("section");
  container.className = "intake-wizard";

  const title = document.createElement("h1");
  title.textContent = "Project Dashboard";

  /* ---------------------------------------------
     Project Info (placeholder)
  --------------------------------------------- */
  const project = {
    id: "proj123",
    homeowner: "John Smith",
    address,
    roofer: "Sunshine Roofing",
    status: "Scheduled",
    startDate: "Feb 12, 2026",
    notes: "Permit approved. Materials ordered."
  };

  const projectCard = createCard({
    title: project.homeowner,
    subtext: project.address,
    variant: "light",
    content: [
      createMetricRow("Roofer", project.roofer),
      createMetricRow("Status", project.status),
      createMetricRow("Start date", project.startDate),
      createMetricRow("Notes", project.notes),
      createButton({
        label: "Update Status",
        variant: "primary",
        onClick: () => alert("Status update UI coming soon")
      })
    ]
  });

  container.append(projectCard);

  /* ---------------------------------------------
     AI Roof Details Card
  --------------------------------------------- */
  if (analysis) {
    const aiCard = createCard({
      title: "AI Roof Details",
      variant: "light",
      content: [
        createMetricRow("Estimated roof area", `${analysis.areaSqFt} sq ft`),
        createMetricRow("Estimated pitch", analysis.pitchLabel),
        createMetricRow("AI roof material", analysis.roofMaterialType),
        createMetricRow("Peaks & valleys", analysis.peaksValleysDescription),
        createMetricRow("Goosenecks (vents)", analysis.goosenecksCount),
        createMetricRow("Complexity", analysis.complexity),
        createMetricRow("Condition score", `${analysis.conditionScore}/100`),
        createMetricRow(
          "Estimated replacement range",
          `$${analysis.estimateLow} – $${analysis.estimateHigh}`
        )
      ]
    });

    container.append(aiCard);
  }

  root.appendChild(container);
}

export const renderView = renderProjectDashboardView;
