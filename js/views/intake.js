// js/views/intake.js
import { createButton, createInputGroup } from "../uiComponents.js";
import { navigate } from "../router.js";

export async function renderIntakeView({ root }) {
  root.innerHTML = "";

  const container = document.createElement("section");
  container.className = "intake-wizard";

  const title = document.createElement("h1");
  title.textContent = "Get personalized roof quotes in minutes";

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Start with your address. We’ll analyze your roof from satellite imagery and match you with vetted roofers.";

  const form = document.createElement("div");

  const { group: addressGroup, input: addressInput } = createInputGroup({
    label: "Property address",
    name: "address",
    placeholder: "123 Main St, St Augustine, FL"
  });

  const { group: emailGroup, input: emailInput } = createInputGroup({
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "you@example.com"
  });

  const { group: phoneGroup, input: phoneInput } = createInputGroup({
    label: "Mobile phone",
    name: "phone",
    type: "tel",
    placeholder: "555-123-4567"
  });

  const { group: wantedTypeGroup, input: wantedTypeInput } = createInputGroup({
    label: "Wanted roof type",
    name: "wantedRoofType",
    placeholder: "Metal, Architectural Shingle, etc."
  });

  const { group: currentTypeGroup, input: currentTypeInput } = createInputGroup({
    label: "Current roof type",
    name: "currentRoofType",
    placeholder: "3-tab shingle, tile, etc."
  });

  const { group: newExistingGroup, input: newExistingInput } = createInputGroup({
    label: "New or existing structure",
    name: "newOrExisting",
    placeholder: "New build or existing home"
  });

  const paymentGroup = document.createElement("div");
  paymentGroup.className = "input-group";

  const paymentLabel = document.createElement("label");
  paymentLabel.className = "label";
  paymentLabel.textContent = "Preferred payment method";

  const paymentSelect = document.createElement("select");
  paymentSelect.name = "paymentMethod";
  paymentSelect.className = "input-light";

  ["", "cash", "loan", "insurance"].forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = v ? v.charAt(0).toUpperCase() + v.slice(1) : "Select payment method";
    paymentSelect.appendChild(opt);
  });

  paymentGroup.append(paymentLabel, paymentSelect);

  form.append(
    addressGroup,
    emailGroup,
    phoneGroup,
    wantedTypeGroup,
    currentTypeGroup,
    newExistingGroup,
    paymentGroup
  );

  const status = document.createElement("div");
  status.id = "intake-status";

  const analyzeBtn = createButton({
    label: "Analyze my roof with AI",
    variant: "primary",
    onClick: async () => {
      const address = addressInput.value.trim();
      if (!address) {
        status.textContent = "Please enter your address.";
        return;
      }

      status.textContent = "Analyzing your roof from satellite imagery...";

      try {
        const res = await fetch(
          `/api/roof-analysis?address=${encodeURIComponent(address)}`
        );

        if (!res.ok) throw new Error("Analysis failed");

        const data = await res.json();

        sessionStorage.setItem(
          "roofAnalysis",
          JSON.stringify({
            address,
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            wantedRoofType: wantedTypeInput.value.trim(),
            currentRoofType: currentTypeInput.value.trim(),
            newOrExisting: newExistingInput.value.trim(),
            paymentMethod: paymentSelect.value,
            analysis: data
          })
        );

        navigate("/analysis");
      } catch (err) {
        console.error(err);
        status.textContent = "We couldn’t analyze your roof. Please try again.";
      }
    }
  });

  container.append(title, subtitle, form, analyzeBtn, status);
  root.appendChild(container);
}

export const renderView = renderIntakeView;
