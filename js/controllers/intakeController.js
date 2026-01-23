// js/controllers/intakeController.js
import { renderIntakeView } from "../views/intake.js";
import { renderIntakeWizardView } from "../views/intakeWizard.js";

export function showIntake(root) {
  return renderIntakeView({ root });
}

export function showIntakeWizard(root) {
  return renderIntakeWizardView({ root });
}
