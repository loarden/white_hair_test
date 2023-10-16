const name = document.querySelector("#name");
const email = document.querySelector("#email");
const validateEmail = document.querySelector("#val-email");
const select = document.querySelector("#select");
const checkbox = document.querySelector("#checkbox");
const form = document.querySelector("form");
const successDisplay = document.querySelector(".success-registration");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput();
});

function validateInput() {
  const inputs = [
    { element: name, errorMsg: "Kérem töltse ki a mezőt" },
    { element: email, errorMsg: "Kérem töltse ki a mezőt" },
    { element: validateEmail, errorMsg: "Kérem töltse ki a mezőt" },
    { element: select, errorMsg: "Kérem válasszon a listából" },
    { element: checkbox, errorMsg: "Kérem fogadja el a szabályzatot" },
  ];

  let error = false;

  inputs.forEach((input) => {
    const { element, errorMsg } = input;
    const value = element.value.trim();
    //Validate input fields
    if (value === "") {
      onError(element, errorMsg);
      error = true;
    } else {
      if (element === email || element === validateEmail) {
        if (!isValidEmail(value)) {
          onError(
            element,
            "Kérem adja meg az email címet megfelelő formátumban"
          );
          error = true;
        } else {
          onSuccess(element);
        }
      } else {
        onSuccess(element);
      }
      if (element === checkbox) {
        if (!element.checked) {
          onError(element, errorMsg);
          error = true;
        } else {
          onSuccess(element);
        }
      }
    }
  });
  //Compare input fileds
  if (validateEmail.value.trim() !== email.value.trim()) {
    onError(validateEmail, "Az email cím nem egyezik");
    error = true;
  } else {
    onSuccess(validateEmail);
  }

  if (error) {
    //When there is an error, return function
    return;
  } else {
    //Display successful registration
    form.style.display = "none";
    successDisplay.style.display = "flex";
  }
}
// Email validation
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
// Set Error message
function onError(element, msg) {
  const inputDiv = element.parentElement;
  const errorDisplay = inputDiv.querySelector(".error");
  errorDisplay.innerHTML = msg;
}
// Set Success
function onSuccess(element) {
  const inputDiv = element.parentElement;
  const errorDisplay = inputDiv.querySelector(".error");
  errorDisplay.innerHTML = "";
}
