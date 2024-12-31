// Function to move focus to the next input field when a number is entered

var qrcode = 0;
document.querySelectorAll(".digit").forEach((input, index, inputs) => {
  input.addEventListener("input", function () {
    // If the input has a value, move to the next input field
    if (this.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
    if (this.value.length > 1 || isNaN(this.value)) {
      this.value = this.value.slice(0, 1); // Keep only the first character
    }
  });
  input.addEventListener("keydown", function (event) {
    if (["e", "E", "+", "-"].includes(event.key)) {
      event.preventDefault();
    }
    if (event.key === "Backspace" && this.value === "") {
      // Focus on the previous input if the current one is empty
      if (index > 0) {
        inputs[index - 1].focus();
        inputs[index - 1].value = ""; // Optionally clear the previous input as well
      }
    }
  });
  // if(index == inputs.length - 1){
  //   const code = saveFinalValue();
  // }
});

