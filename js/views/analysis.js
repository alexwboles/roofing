// js/views/analysis.js
import { createButton, createCard, createMetricRow } from "../uiComponents.js";
import { navigate } from "../router.js";

export async function renderAnalysisView({ root }) {
  root.innerHTML = "";

  const stored = sessionStorage.getItem("roofAnalysis");
  if (!stored) {
    navigate("/intake");
    return;
  }

  const {
    address,
    email,
    phone,
    wantedRoofType,
    currentRoofType,
    newOrExisting,
    paymentMethod,
    analysis
  } = JSON.parse(stored);

  const container = document.createElement("section");
  container.className = "intake-wizard";

  const title = document.createElement("h1");
  title.textContent = "We analyzed your roof";

  // AI roof snapshot (from satellite imagery)
  const summaryCard = createCard({
    title: "AI Roof Snapshot",
    subtext: address,
    variant: "light",
    content: [
      createMetricRow("Estimated roof area", `${analysis.areaSqFt} sq ft`),
      createMetricRow("Estimated pitch", analysis.pitchLabel),
      createMetricRow("Roof material (AI guess)", analysis.roofMaterialType),
      createMetricRow("Peaks & valleys", analysis.peaksValleysDescription),
      createMetricRow(
        "Estimated number of goosenecks",
        String(analysis.goosenecksCount)
      ),
      createMetricRow("Complexity", analysis.complexity),
      createMetricRow("Condition score", `${analysis.conditionScore}/100`),
      createMetricRow(
        "Estimated replacement range",
        `$${analysis.estimateLow} – $${analysis.estimateHigh}`
      )
    ]
  });

  // Homeowner preferences from intake
  const prefsCard = createCard({
    title: "Your project preferences",
    variant: "light",
    content: [
      createMetricRow("Wanted roof type", wantedRoofType || "Not specified"),
      createMetricRow("Current roof type", currentRoofType || "Not specified"),
      createMetricRow(
        "New or existing structure",
        newOrExisting || "Not specified"
      ),
      createMetricRow(
        "Preferred payment method",
        paymentMethod ? paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1) : "Not specified"
      ),
      createMetricRow("Email", email || "Not provided"),
      createMetricRow("Phone", phone || "Not provided")
    ]
  });

  const cta = createButton({
    label: "Get competing quotes from local roofers",
    variant: "primary",
    onClick: () => navigate("/quotes")
  });

  container.append(title, summaryCard, prefsCard, cta);
  root.appendChild(container);
}

export const renderView = renderAnalysisView;
