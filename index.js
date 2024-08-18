let passwordLength = 0;
let includeLowercase = false;
let includeUppercase = false;
let includeNumbers = false;
let includeSymbols = false;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("generatebtn").addEventListener("click", generate);
  document.getElementById("donebtn").addEventListener("click", handleClick);
  document.getElementById("settingsIcon").addEventListener("click", toggleDivs);
  document.getElementById("copybtn").addEventListener("click", copyText);
});

function generatePassword(
  length,
  includeLowercase,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*?_-()+=><";

  let allowedChars = "";
  let password = "";
  let message = "";

  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeNumbers ? numberChars : "";
  allowedChars += includeSymbols ? symbolChars : "";

  if (length > 20) {
    message = "password cant be more than 20 chars";
    document.getElementById("password").textContent = message;
  } else if (length <= 0) {
    message = "Password length must be at least 1";
    document.getElementById("password").textContent = message;
  } else if (allowedChars.length === 0) {
    message = "At least 1 set of characters needs to be selected";
    document.getElementById("password").textContent = message;
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      password += allowedChars[randomIndex];
    }
    document.getElementById("password").textContent = password;
    document.getElementById("copybtn").style.display = "block";
  }
}

function done() {
  passwordLength = parseInt(document.getElementById("length").value);
  includeLowercase = document.getElementById("lowerCase").checked;
  includeUppercase = document.getElementById("upperCase").checked;
  includeNumbers = document.getElementById("numbers").checked;
  includeSymbols = document.getElementById("symbols").checked;
}

function generate() {
  document.getElementById("copyMessage").value = "";
  document.getElementById("copied").style.display = "none";
  generatePassword(
    passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
}

function toggleDivs() {
  const settingsDiv = document.getElementById("settings");
  const containerDiv = document.getElementById("container");

  if (settingsDiv.style.display === "none") {
    settingsDiv.style.display = "flex";
    containerDiv.style.display = "none";
  } else {
    settingsDiv.style.display = "none";
    containerDiv.style.display = "flex";
  }
}

function handleClick() {
  toggleDivs();
  done();
}

function copyText() {
  const passwordDisplay = document.getElementById("password");
  const password = passwordDisplay.textContent;

  if (password) {
    navigator.clipboard
      .writeText(password)
      .then(function () {
        document.getElementById("copyMessage").value = "Copied to clipboard!";
        document.getElementById("copybtn").style.display = "none";
        document.getElementById("copied").style.display = "block";
      })
      .catch(function (error) {
        console.error("Failed to copy: ", error);
      });
  } else {
    console.error("No text to copy.");
  }
}
