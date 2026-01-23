// js/controllers/quoteController.js
import { renderQuoteComparisonView } from "../views/quoteComparison.js";
import { renderQuoteSubmissionView } from "../views/quoteSubmission.js";

export function showQuoteComparison(root) {
  return renderQuoteComparisonView({ root });
}

export function showQuoteSubmission(root, params) {
  return renderQuoteSubmissionView({ root, params });
}
