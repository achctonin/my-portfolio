let isWindowOpen = false;

function openWindow(id) {
    // Check if a window is already open
    if (isWindowOpen) return;

    const win = document.getElementById(id);
    const workspace = document.querySelector('.workspace');

    if (win) {
        win.classList.remove('hidden');
        workspace.classList.add('locked'); // Dim the background icons
        isWindowOpen = true;
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    const workspace = document.querySelector('.workspace');

    if (win) {
        win.classList.add('hidden');
        workspace.classList.remove('locked'); // Brighten the background icons
        isWindowOpen = false;
    }
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'src/resume.pdf'; // path to your resume PDF file
    link.download = 'Resume.pdf'; // the filename saved on their device
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Function to open a window from the mobile menu and close the menu
function openMobileWindow(windowId) {
    toggleMobileMenu(); // Closes the black overlay
    openWindow(windowId); // Calls your existing function to open the popup
}

let num1 = 0;
let operator = "";
let freshInput = false;

function pressNum(v) {
    const d = document.getElementById("display");

    if (d.textContent === "0" || freshInput) {
        d.textContent = v;
        freshInput = false;
    } else {
        d.textContent += v;
    }
}

function pressDec() {
    const d = document.getElementById("display");

    if (freshInput) {
        d.textContent = "0.";
        freshInput = false;
        return;
    }

    if (!d.textContent.includes(".")) {
        d.textContent += ".";
    }
}

function pressOp(op) {
    const d = document.getElementById("display");

    num1 = parseFloat(d.textContent);
    operator = op;
    freshInput = true;
}

function calculate() {
    const d = document.getElementById("display");
    const num2 = parseFloat(d.textContent);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            return;
    }

    d.textContent =
        typeof result === "number"
            ? parseFloat(result.toFixed(10))
            : result;

    num1 = typeof result === "number" ? result : 0;
    freshInput = true;
}

function pressClear() {
    const d = document.getElementById("display");

    d.textContent = "0";
    num1 = 0;
    operator = "";
    freshInput = false;
}

function pressDel() {
    const d = document.getElementById("display");

    d.textContent =
        d.textContent.length > 1
            ? d.textContent.slice(0, -1)
            : "0";
}

function pressNeg() {
    const d = document.getElementById("display");
    const v = parseFloat(d.textContent);

    if (!isNaN(v) && v !== 0) {
        d.textContent = String(v * -1);
    }
}