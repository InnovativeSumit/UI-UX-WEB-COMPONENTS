const indicator = document.querySelector(".indicator");
const input = document.getElementById("passwordInput");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
const showBtn = document.querySelector(".showBtn");
const generateBtn = document.getElementById("generateBtn");

// Password options elements
const lengthInput = document.getElementById("lengthInput");
const uppercaseCheck = document.getElementById("uppercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

// Regular expressions for password strength
const regExpWeak = /[a-z]/;
const regExpMedium = /\d+/;
const regExpStrong = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

// Character sets for password generation
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

// Toggle password visibility
showBtn.addEventListener("click", () => {
    if (input.type === "password") {
        input.type = "text";
        showBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = "password";
        showBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

// Generate password function
function generatePassword() {
    let chars = lowercaseChars;
    let password = "";
    
    if (uppercaseCheck.checked) chars += uppercaseChars;
    if (numbersCheck.checked) chars += numberChars;
    if (symbolsCheck.checked) chars += symbolChars;
    
    const length = parseInt(lengthInput.value);
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    input.value = password;
    trigger(); // Update strength indicator
}

// Password strength checker
function trigger() {
    if (input.value !== "") {
        indicator.style.display = "flex";
        text.style.display = "block";
        
        let strength = 0;
        
        // Check length
        if (input.value.length <= 3) {
            strength = 1;
        } else if (input.value.length >= 6) {
            // Check character types
            const hasLower = regExpWeak.test(input.value);
            const hasUpper = /[A-Z]/.test(input.value);
            const hasNumber = regExpMedium.test(input.value);
            const hasSymbol = regExpStrong.test(input.value);
            
            const typeCount = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
            
            if (typeCount >= 3 && input.value.length >= 8) {
                strength = 3;
            } else if (typeCount >= 2) {
                strength = 2;
            } else {
                strength = 1;
            }
        } else {
            strength = 1;
        }
        
        // Update UI based on strength
        weak.classList.toggle("active", strength >= 1);
        medium.classList.toggle("active", strength >= 2);
        strong.classList.toggle("active", strength >= 3);
        
        // Update text
        text.className = "text";
        if (strength === 1) {
            text.textContent = "Your password is too weak";
            text.classList.add("weak");
        } else if (strength === 2) {
            text.textContent = "Your password is medium";
            text.classList.add("medium");
        } else if (strength === 3) {
            text.textContent = "Your password is strong!";
            text.classList.add("strong");
        }
        
        showBtn.style.display = "block";
    } else {
        indicator.style.display = "none";
        text.style.display = "none";
        showBtn.style.display = "none";
    }
}

// Event listeners
input.addEventListener("input", trigger);
generateBtn.addEventListener("click", generatePassword);

// Initialize
trigger();
