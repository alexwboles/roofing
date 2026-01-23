// functions/roof-analysis.js
// Simulated AI roof analysis from satellite imagery based on address.

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const address = url.searchParams.get("address") || "Unknown address";

    const body = JSON.stringify({
      address,
      areaSqFt: 2450,
      pitchLabel: "6/12 (approx. 26.6°)",
      roofMaterialType: "Asphalt shingle (architectural)",
      peaksValleysDescription: "Primary ridge with 4 major valleys",
      goosenecksCount: 5,
      complexity: "Gable with minor hips",
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
