// functions/generateReport.js
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const address = url.searchParams.get("address") || "Unknown address";

    const body = JSON.stringify({
      address,
      reportUrl: "https://example.com/report.pdf"
    });

    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
};
