const input = document.getElementById("input");
const result = document.getElementById("result");
const main = document.querySelector("main");
const root = document.querySelector(":root");

document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else if (main.dataset.theme === "light") {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

document.querySelectorAll(".charKey").forEach(function (charKey) {
  charKey.addEventListener("click", function (key) {
    input.value += key.currentTarget.dataset.value;
  });
});

document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
});

input.addEventListener("keydown", function (ev) {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value = input.value + ev.key;
  } else if (ev.key === "Enter") {
    calculate();
  } else if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
});

document.getElementById("equal").addEventListener("click", calculate);

function calculate() {
  const value = input.value;
  if (result.classList.contains("error")) {
    result.classList.remove("error");
  }
  try {
    const resultado = eval(value);
    result.value = resultado;
    if (result.value == "undefined") {
      result.value = "Insira os valores";
    }
  } catch {
    result.classList.add("error");
    result.value = "Error!";
  }
}

document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const btn = ev.currentTarget;
    btn.classList.add("success");
    btn.innerText = "Copied!";
    navigator.clipboard.writeText(result.value);
  });

document.getElementById("input").addEventListener("focus", function () {
  const btn = document.getElementById("copyToClipboard");
  btn.classList.remove("success");
  btn.innerText = "Copy";
});
