// functions/analyzeRoof.js
// Simulated AI roof analysis from satellite imagery based on address.
// In production, this is where you'd call your real vision/AI pipeline.

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const address = url.searchParams.get("address") || "Unknown address";

    // You can make this deterministic or random-ish based on address hash.
    // For now, we return a realistic, static "AI" payload.
    const body = JSON.stringify({
      address,
      // Core sizing + economics
      areaSqFt: 2450,
      pitchLabel: "6/12 (approx. 26.6°)",
      complexity: "Gable with minor hips",
      conditionScore: 82,
      estimateLow: 13500,
      estimateHigh: 17200,

      // AI-derived details from satellite imagery (simulated)
      roofMaterialType: "Asphalt shingle (architectural)",
      peaksValleysDescription: "Primary ridge with 4 major valleys",
      goosenecksCount: 5,
      pitchEstimateDegrees: 27
    });

    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
