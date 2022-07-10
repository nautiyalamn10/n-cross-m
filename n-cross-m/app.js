const container = document.getElementById("container");
const btn = document.getElementById("btn");
const rows = document.getElementById("rows");
const cols = document.getElementById("cols");
const submit = document.getElementById("submit");
const operation = document.getElementById("operation");
const menu = document.querySelector(".menu");

function makeRows(rows, cols) {
  rows = parseInt(rows);
  cols = parseInt(cols);
  if (rows == NaN || cols == NaN) {
    return;
  }
  if (!rows || !cols) {
    return;
  }
  let child = container.lastElementChild;
  while (child) {
    container.removeChild(child);
    child = container.lastElementChild;
  }
  cols++;
  rows++;
  const unitWidth = 90 / cols + "vw";
  const unitHeigth = 90 / rows + "vh";

  container.style.setProperty("--grid-rows", rows);
  container.style.setProperty("--grid-cols", cols);
  container.style.setProperty("--grid-width", unitWidth);
  container.style.setProperty("--grid-heigth", unitHeigth);
  let rowValue = [],
    colValue = [];
  rows--;
  cols--;
  let cell = document.createElement("div");
  cell.innerText = operation.value;
  container.appendChild(cell).className = "operation";
  for (let i = 0; i < rows; i++) {
    let x = Math.floor(Math.random() * 10 + 1);
    rowValue.push(x);
  }
  for (let i = 0; i < cols; i++) {
    let x = Math.floor(Math.random() * 10 + 1);
    colValue.push(x);

    let cell = document.createElement("div");
    cell.innerText = x;
    container.appendChild(cell).className = "data";
  }

  for (c = 0; c < rows * cols; c++) {
    if (c % cols == 0) {
      let cell = document.createElement("div");
      cell.innerText = rowValue[c / cols];
      container.appendChild(cell).className = "data";
    }
    let cell = document.createElement("div");
    let inp = document.createElement("input");
    cell.appendChild(inp);
    container.appendChild(cell).className = "grid-item";
  }
}
function CalculateResult(rowValue, colValue, inputValue, operator) {
  let answers = [];
  for (let i = 0; i < rowValue.length; i++) {
    for (let j = 0; j < colValue.length; j++) {
      switch (operator) {
        case "multiply":
          answers.push(rowValue[i] * colValue[j]);
          break;
        case "addition":
          answers.push(rowValue[i] + colValue[j]);
          break;
        case "subtraction":
          answers.push(rowValue[i] - colValue[j]);
          break;
      }
    }
  }
  let correctAnswers = 0;
  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue[i] == answers[i]) correctAnswers += 1;
  }
  const totalCalculation = inputValue.length;
  if (container.getElementsByTagName("h1")[0] !== undefined) {
    container.removeChild(container.getElementsByTagName("h1")[0]);
  }
  const heading = document.createElement("h1");

  const accuracy = (correctAnswers / totalCalculation) * 100;
  heading.innerHTML = `You Scored ${correctAnswers} with ${accuracy}% accuracy`;
  container.appendChild(heading);
}
function getResult(rows, cols) {
  let colValue = [],
    rowValue = [],
    inputValue = [];
  cols = parseInt(cols);
  rows = parseInt(rows);
  for (let i = 1; i <= rows; i++) {
    colValue.push(parseInt(container.children[i].innerHTML));
  }
  let index = 1 * cols + 1;
  for (let i = 1; i <= rows; i++) {
    rowValue.push(parseInt(container.children[index].innerHTML));
    index += cols + 1;
  }
  ++cols;
  ++rows;
  for (let i = cols + 1; i < rows * cols; i++) {
    let temp = i;
    if (temp % cols == 0) continue;
    inputValue.push(parseInt(container.children[i].children[0].value));
  }
  CalculateResult(rowValue, colValue, inputValue, operation.value);
}
btn.addEventListener("click", () => makeRows(rows.value, cols.value));
submit.addEventListener("click", () => getResult(rows.value, cols.value));
