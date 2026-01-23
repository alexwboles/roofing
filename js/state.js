// js/state.js
export const appState = {
  roofAnalysis: null,
  quotes: [],
  activeLead: null
};

export function loadStateFromSession() {
  const analysis = sessionStorage.getItem("roofAnalysis");
  const quotes = sessionStorage.getItem("quotes");
  const activeLead = sessionStorage.getItem("activeLead");

  if (analysis) appState.roofAnalysis = JSON.parse(analysis);
  if (quotes) appState.quotes = JSON.parse(quotes);
  if (activeLead) appState.activeLead = JSON.parse(activeLead);
}

export function persistState() {
  if (appState.roofAnalysis) {
    sessionStorage.setItem("roofAnalysis", JSON.stringify(appState.roofAnalysis));
  }
  sessionStorage.setItem("quotes", JSON.stringify(appState.quotes || []));
  if (appState.activeLead) {
    sessionStorage.setItem("activeLead", JSON.stringify(appState.activeLead));
  }
}
