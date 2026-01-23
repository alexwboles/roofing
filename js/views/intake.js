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

  // Property address (drives AI)
  const { group: addressGroup, input: addressInput } = createInputGroup({
    label: "Property address",
    name: "address",
    placeholder: "123 Main St, St Augustine, FL"
  });

  // Email address (explicitly requested)
  const { group: emailGroup, input: emailInput } = createInputGroup({
    label: "Email address",
    name: "email",
    type: "email",
    placeholder: "you@example.com"
  });

  // Mobile phone
  const { group: phoneGroup, input: phoneInput } = createInputGroup({
    label: "Mobile phone",
    name: "phone",
    type: "tel",
    placeholder: "555-123-4567"
  });

  // Wanted roof type
  const { group: wantedTypeGroup, input: wantedTypeInput } = createInputGroup({
    label: "Wanted roof type",
    name: "wantedRoofType",
    placeholder: "e.g., Metal, Architectural Shingle"
  });

  // Current roof type
  const { group: currentTypeGroup, input: currentTypeInput } = createInputGroup({
    label: "Current roof type",
    name: "currentRoofType",
    placeholder: "e.g., 3-tab shingle"
  });

  // New or existing (simple text input; you can swap to select later)
  const { group: newExistingGroup, input: newExistingInput } = createInputGroup({
    label: "New or existing structure",
    name: "newOrExisting",
    placeholder: "New build or existing home"
  });

  // Payment method (cash, loan, or insurance)
  const paymentGroup = document.createElement("div");
  paymentGroup.className = "input-group";

  const paymentLabel = document.createElement("label");
  paymentLabel.className = "label";
  paymentLabel.textContent = "Preferred payment method";

  const paymentSelect = document.createElement("select");
  paymentSelect.name = "paymentMethod";
  paymentSelect.id = "paymentMethod";
  paymentSelect.className = "input-light";

  const opts = [
    { value: "", label: "Select payment method" },
    { value: "cash", label: "Cash" },
    { value: "loan", label: "Loan" },
    { value: "insurance", label: "Insurance" }
  ];

  opts.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.value;
    opt.textContent = o.label;
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

      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const wantedRoofType = wantedTypeInput.value.trim();
      const currentRoofType = currentTypeInput.value.trim();
      const newOrExisting = newExistingInput.value.trim();
      const paymentMethod = paymentSelect.value;

      try {
        // AI: derive as much as possible from satellite imagery using address
        const res = await fetch(
          `/api/roof-analysis?address=${encodeURIComponent(address)}`
        );
        if (!res.ok) throw new Error("Analysis failed");

        const data = await res.json();

        // Persist everything we know for downstream views
        sessionStorage.setItem(
          "roofAnalysis",
          JSON.stringify({
            address,
            email,
            phone,
            wantedRoofType,
            currentRoofType,
            newOrExisting,
            paymentMethod,
            analysis: data
          })
        );

        navigate("/analysis");
      } catch (err) {
        console.error(err);
        status.textContent =
          "We couldn’t analyze your roof. Please try again.";
      }
    }
  });

  container.append(title, subtitle, form, analyzeBtn, status);
  root.appendChild(container);
}

export const renderView = renderIntakeView;
