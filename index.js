let passwordLength = 0;
let includeLowercase = false;
let includeUppercase = false;
let includeNumbers = false;
let includeSymbols = false;




function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols){
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*?_-()+=><';

    let allowedChars = "";
    let password = "";
    let message = "";

    allowedChars += includeLowercase ? lowercaseChars: "";
    allowedChars += includeUppercase ? uppercaseChars : "";
    allowedChars += includeNumbers ? numberChars : "";
    allowedChars += includeSymbols ? symbolChars : "";

    if (length > 20) {
        message = "password cant be more than 20 chars";
      document.getElementById("password").textContent = message;
    }
    if(length <= 0){
        message = ' Password length must be at least 1 ';
        document.getElementById("password").textContent = message;
    }

    if(allowedChars.length === 0){
        message = ' At least 1 set of characters needs to be selected ';
        document.getElementById("password").textContent = message;
    }

    for ( let i = 0; i< length; i++){
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    
    if (message === ""){
        document.getElementById("password").value = password;
        document.getElementById("copybtn").style.display = "block";
    }
    
}

function done(){
    this.passwordLength = document.getElementById("length").value;
    if (this.passwordLength > 20 || this.passwordLength < 0){
        document.getElementById("password").textContent = "password cant be more than 20 chars";
    }
    this.includeLowercase = document.getElementById("lowerCase").checked;
    this.includeUppercase = document.getElementById("upperCase").checked;
    this.includeNumbers = document.getElementById("numbers").checked;
    this.includeSymbols = document.getElementById("symbols").checked;
    
}   

function generate(){
    document.getElementById("copyMessage").value = "";
    document.getElementById("copied").style.display = "none";
    generatePassword(this.passwordLength, this.includeLowercase, this.includeUppercase, this.includeNumbers, this.includeSymbols);
}



function show() {
  const settingsDiv = document.getElementById("settings");
  settingsDiv.style.display =
    settingsDiv.style.display === "none" ? "block" : "none";
}

function handleClick(){
    show();
    done();
}

function copyText() {
  const passwordDisplay = document.getElementById("password");
  const password = passwordDisplay.value;

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