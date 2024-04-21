document.addEventListener("DOMContentLoaded", function() {
    const inputs = document.querySelectorAll(".input-field");
    const toggle_btn = document.querySelectorAll(".toggle");
    const main = document.querySelector("main");
    const bullets = document.querySelectorAll(".bullets span");
    const images = document.querySelectorAll(".image");
    const message = document.getElementById("message");
  
    inputs.forEach((inp) => {
      inp.addEventListener("focus", () => {
        inp.classList.add("active");
      });
      inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
      });
    });
  
    toggle_btn.forEach((btn) => {
      btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
      });
    });
  
    function moveSlider() {
      let index = this.dataset.value;
  
      let currentImage = document.querySelector(`.img-${index}`);
      images.forEach((img) => img.classList.remove("show"));
      currentImage.classList.add("show");
  
      const textSlider = document.querySelector(".text-group");
      textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;
  
      bullets.forEach((bull) => bull.classList.remove("active"));
      this.classList.add("active");
    }
  
    bullets.forEach((bullet) => {
      bullet.addEventListener("click", moveSlider);
    });
  
    const firebaseConfig = {
        apiKey: "AIzaSyCbQ-VYQ0JdaTrh6WhDV71NtWMduw9tgHc",
        authDomain: "budget-buddy-cc47f.firebaseapp.com",
        projectId: "budget-buddy-cc47f",
        storageBucket: "budget-buddy-cc47f.appspot.com",
        messagingSenderId: "471301607939",
        appId: "1:471301607939:web:beb72ef7a5060f24de7436",
        measurementId: "G-D5JR9N0RLE"
        // Your Firebase configuration object
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
    // Get a reference to the Firestore database
    const db = firebase.firestore();
  
    // Function to handle sign-up
    // Function to handle sign-up
// Function to handle sign-up
function signUp(event) {
  event.preventDefault(); // Prevent form submission

  // Get values from input fields
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;
  const message = document.getElementById('message');
  const errorBox = document.getElementById('emailErrorBox');
  
  // Check if any field is empty
  if (!email || !password || !name) {
    alert("Please fill all fields");
    return; // Exit the function if any field is empty
}
  // Check if the email address is valid (contains @gmail.com)
  if (!email.includes("@gmail.com")) {
      errorBox.innerText = "Please provide a valid Gmail address";
      errorBox.style.display = "block";
      return; // Exit the function if email is not valid
  }
  if (password.length < 6) {
    alert("Password should be at least 6 characters long");
    return; // Exit the function if password is less than 6 characters
}

  // Clear any previous error messages
  errorBox.innerText = "";
  errorBox.style.display = "none";
  message.innerText = "";

  // Attempt sign-up if all fields are filled and email is valid
  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed up successfully
          alert("Sign up successful!");
          console.log(userCredential);
          var user = userCredential.user;

          // Redirect to home.html after successful sign-up
          window.location.href = "../home/home.html";
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        if (error.code === "auth/email-already-in-use") {
            alert("An account with this email already exists. Please sign in or use a different email address.");
        } else {
            alert("Error: " + error.message);
        }
    });
}

    const emailInput = document.getElementById('registerEmail');
const errorBox = document.getElementById('emailErrorBox');

// Function to check and display email validation error message
function validateEmail() {
    const email = emailInput.value;

    if (!email.includes("@gmail.com")) {
        errorBox.innerText = "Please provide a valid Gmail address";
        errorBox.style.display = "block";
    } else {
        errorBox.innerText = ""; // Clear error message if email is valid
        errorBox.style.display = "none";
    }
}

// Attach event listeners to the email input field for keyup and focusout events
emailInput.addEventListener('keyup', validateEmail);
emailInput.addEventListener('focusout', validateEmail);


    
  
    // Function to handle sign-in
    function signIn(event) {
      event.preventDefault(); // Prevent form submission
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
  
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
              // Signed in successfully
              alert("Sign in successful!");
              window.location.href = "../home/home.html";
              console.log(userCredential);
          })
          .catch((error) => {
            console.log(error.code);
            console.log(error.message);
            if (error.code === "auth/user-not-found") {
                alert("Account with this email doesn't exist. Please sign up or use a different email address.");
            } else if (error.code === "auth/wrong-password") {
                alert("The password is incorrect. Please try again.");
            } else {
                alert("Error: " + error.message);
            }
        });
  }
  
  // Attach sign-up event listener to the sign-up button
  document.getElementById('signUpButton').addEventListener('click', signUp);
  
  // Attach sign-in event listener to the sign-in button
  document.getElementById('signInButton').addEventListener('click', signIn);
});
