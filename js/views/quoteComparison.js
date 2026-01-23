// js/views/quoteComparison.js
import { createCard, createMetricRow } from "../uiComponents.js";

export async function renderQuoteComparisonView({ root }) {
  root.innerHTML = "";

  const stored = sessionStorage.getItem("roofAnalysis");
  const analysis = stored ? JSON.parse(stored).analysis : null;

  const container = document.createElement("section");
  container.className = "intake-wizard";

  const title = document.createElement("h1");
  title.textContent = "Compare roof quotes side by side";

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Compare price, timeline, warranty, and AI‑derived roof details.";

  if (analysis) {
    const aiCard = createCard({
      title: "AI Roof Snapshot",
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

  const table = document.createElement("div");
  table.className = "quote-table";

  const storedQuotes = JSON.parse(sessionStorage.getItem("quotes") || "[]");

  const quotes =
    storedQuotes.length > 0
      ? storedQuotes
      : [
          {
            roofer: "Sunshine Roofing",
            price: 14800,
            timeline: "2 weeks",
            warranty: "25 years",
            rating: 4.8
          },
          {
            roofer: "Atlantic Coast Roofers",
            price: 13950,
            timeline: "3 weeks",
            warranty: "20 years",
            rating: 4.6
          }
        ];

  quotes.forEach((q) => {
    const row = document.createElement("div");
    row.className = "quote-row";

    row.innerHTML = `
      <div class="quote-roofer">${q.roofer}</div>
      <div class="quote-price">$${q.price.toLocaleString()}</div>
      <div class="quote-meta">${q.timeline} • ${q.warranty}</div>
      <div class="quote-rating">${q.rating ?? ""}${q.rating ? "★" : ""}</div>
    `;

    table.appendChild(row);
  });

  container.append(title, subtitle, table);
  root.appendChild(container);
}

export const renderView = renderQuoteComparisonView;
