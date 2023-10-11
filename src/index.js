import "./style.css";

const form = document.querySelector("form");
const email = document.querySelector("#mail");
const country = document.querySelector("#country");
const zipcode = document.querySelector("#zipcode");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const emailResultText = document.querySelector("#mail + div.resultText");
const countryResultText = document.querySelector("#country + div.resultText");
const zipcodeResultText = document.querySelector("#zipcode + div.resultText");
const passwordResultText = document.querySelector("#password + div.resultText");
const passwordConfirmationResultText = document.querySelector(
  "#password-confirmation + div.resultText",
);

function isValidEmail(emailInput) {
  const emailRegExp =
    /^[a-z0-9](\.?[a-z0-9])*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/;
  const emailCleaned = emailInput.trim();
  return emailRegExp.test(emailCleaned);
}

function isValidPassword(passwordInput) {
  const number = /[0-9]/.test(passwordInput);
  const upperCase = /[A-Z]/.test(passwordInput);
  const lowerCase = /[a-z]/.test(passwordInput);
  const symbol = /[!-/:-@[-`{-~]/.test(passwordInput);
  const containsAtLeastOne = number && lowerCase && upperCase && symbol;
  const passwordRegExp = /^[ -~]{8,}$/;
  return passwordRegExp.test(password) && containsAtLeastOne;
}

function showResultTextContentEmail(value) {
  if (isValidEmail(value)) {
    emailResultText.textContent = "your email valid!";
  } else {
    if (value.length === 0) {
      emailResultText.textContent = "enter email address please";
    } else {
      emailResultText.textContent = "invalid email";
    }
    if (value.includes("@") && value.endsWith(".")) {
      emailResultText.textContent = "email cannot end in (.) dot";
    }
    if (/\.{2,}/.test(value)) {
      emailResultText.textContent = `cannot contain consecutive dots`;
    }
  }
}


function showResultTextContentPassword(value) {
  passwordResultText.textContent = '';
  if (isValidPassword(value)) {
    passwordResultText.textContent = 'password correct';
  } else {
    if(value.length === 0) {
      passwordResultText.textContent = 'please input password';
    } else {
      passwordResultText.textContent = 'invalid password';
    } 
    if (value.length < 8) {
      passwordResultText.textContent += 'please input more than 8 char';
    } else {
      if (!/[0-9]/.test(value)) {
        passwordResultText.textContent += 'It should contain at least one digit';
      }
      if (!/[A-Z]/.test(value)) {
        passwordResultText.textContent += 'It should contain at least one upper case letter';
      }
      if (!/[a-z]/.test(value)) {
        passwordResultText.textContent += 'It should contain at least one lower case letter';
      }
      if (!/[!-/:-@[-`{-~]/.test(value)) {
        passwordResultText.textContent += 'It should contain at least one symbol';
      }
    }
  }
}

email.addEventListener("input", () => {
  if (isValidEmail(email.value)) {
    showResultTextContentEmail(email.value);
    emailResultText.classList.remove("active");
    emailResultText.classList.add("valid");
  } else {
    showResultTextContentEmail(email.value);
    emailResultText.classList.add("active");
    emailResultText.classList.remove("valid");
  }
});

password.addEventListener("input", () => {
  if (isValidPassword(password.value)) {
    showResultTextContentPassword(password.value);
    passwordResultText.classList.add("valid");
    passwordResultText.classList.remove("active");
  } else {
    showResultTextContentPassword(password.value);
    passwordResultText.classList.add("active");
    passwordResultText.classList.remove("valid");
  }
});
