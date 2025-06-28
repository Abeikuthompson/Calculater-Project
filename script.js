const buttonValues = [
  "AC",
  "+/-",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const rightSymbols = ["/", "*", "-", "+", "="];
const display = document.getElementById("display");
const buttonsContainer = document.getElementById("buttons");
let currentInput = "";

// Function to update display
function updateDisplay(value) {
  display.textContent = value || "0";
}

// Create calculator buttons dynamically
buttonValues.forEach((value) => {
  const button = document.createElement("button");
  button.textContent = value;

  if (["/", "*", "-", "+"].includes(value)) {
    button.classList.add("operator");
  } else if (value === "=") {
    button.classList.add("equal");
  } else if (value === "AC") {
    button.classList.add("clear");
  }

  button.addEventListener("click", () => handleInput(value));
  buttonsContainer.appendChild(button);
});

// Handle all inputs
function handleInput(value) {
  if (value === "AC") {
    currentInput = "";
  } else if (value === "=") {
    try {
      currentInput = eval(currentInput).toString();
    } catch {
      currentInput = "Error";
    }
  } else if (value === "+/-") {
    if (currentInput) {
      if (currentInput.startsWith("-")) {
        currentInput = currentInput.slice(1);
      } else {
        currentInput = "-" + currentInput;
      }
    }
  } else if (value === "%") {
    try {
      currentInput = (parseFloat(currentInput) / 100).toString();
    } catch {
      currentInput = "Error";
    }
  } else {
    currentInput += value;
  }

  updateDisplay(currentInput);
}

// Keyboard input
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key) || rightSymbols.includes(key) || key === ".") {
    handleInput(key);
  } else if (key === "Enter") {
    handleInput("=");
  } else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  } else if (key.toLowerCase() === "c") {
    handleInput("AC");
  }
});
