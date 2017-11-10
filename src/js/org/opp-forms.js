// Update form to require/not allow date and times, based on Flexible Schedule checkbox
export function toggleFlexible(e) {
  const scheduleInputs = document.querySelectorAll(".schedule-input");
  const scheduleLabels = document.querySelectorAll(".schedule-label");
  const addressInput = document.getElementById("address");

  if (e.target.checked) {
    // Dim labels and inputs, stop requiring them, mark input disabled
    scheduleLabels.forEach(label => {
      label.classList.add("text-muted");
    });
    scheduleInputs.forEach(input => {
      input.removeAttribute("required");
      input.setAttribute("disabled", true);
    });

    // Focus the address input
    addressInput.focus();
  } else {
    // Reset labels and inputs to initial state
    scheduleLabels.forEach((label)=> {
      label.classList.remove("text-muted");
    });
    scheduleInputs.forEach((input)=> {
      input.setAttribute("required", true);
      input.removeAttribute("disabled");
    });
  }
}