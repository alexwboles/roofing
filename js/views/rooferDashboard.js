// js/views/rooferDashboard.js
// Roofer dashboard showing AI-derived roof details for each lead

import { createButton, createCard } from "../uiComponents.js";

export async function renderRooferDashboardView({ root }) {
  root.innerHTML = "";

  const container = document.createElement("section");
  container.className = "intake-wizard";

  const title = document.createElement("h1");
  title.textContent = "Roofer Dashboard";

  // Leads would normally come from backend
  const leads = [
    {
      id: "lead123",
      homeowner: "John Smith",
      address: "123 Main St, St Augustine, FL",
      analysis: {
        areaSqFt: 2450,
        pitchLabel: "6/12 (approx. 26.6°)",
        roofMaterialType: "Asphalt shingle (architectural)",
        peaksValleysDescription: "Primary ridge with 4 major valleys",
        goosenecksCount: 5,
        complexity: "Gable with minor hips",
        conditionScore: 82,
        estimateLow: 13500,
        estimateHigh: 17200
      }
    }
  ];

  const list = document.createElement("div");
  list.className = "project-list";

  leads.forEach((lead) => {
    const a = lead.analysis;

    const card = createCard({
      title: lead.homeowner,
      subtext: lead.address,
      variant: "light",
      content: [
        metric("Estimated roof area", `${a.areaSqFt} sq ft`),
        metric("Estimated pitch", a.pitchLabel),
        metric("AI roof material", a.roofMaterialType),
        metric("Peaks & valleys", a.peaksValleysDescription),
        metric("Goosenecks (vents)", a.goosenecksCount),
        metric("Complexity", a.complexity),
        metric("Condition score", `${a.conditionScore}/100`),
        metric(
          "AI estimated replacement range",
          `$${a.estimateLow} – $${a.estimateHigh}`
        ),
        createButton({
          label: "Create Quote",
          variant: "primary",
          onClick: () => {
            sessionStorage.setItem("activeLead", JSON.stringify(lead));
            window.location.href = "/quoteSubmission";
          }
        })
      ]
    });

    list.appendChild(card);
  });

  container.append(title, list);
  root.appendChild(container);
}

function metric(label, value) {
  const row = document.createElement("div");
  row.className = "card-row";

  const l = document.createElement("span");
  l.textContent = label;

  const v = document.createElement("strong");
  v.textContent = value;

  row.append(l, v);
  return row;
}

export const renderView = renderRooferDashboardView;
