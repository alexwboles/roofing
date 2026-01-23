// functions/analyzeRoof.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const address = url.searchParams.get("address") || "Unknown address";

    // Fake AI analysis for now
    const body = JSON.stringify({
      address,
      areaSqFt: 2450,
      pitchLabel: "6/12",
      complexity: "Gable",
      conditionScore: 82,
      estimateLow: 13500,
      estimateHigh: 17200
    });

    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
