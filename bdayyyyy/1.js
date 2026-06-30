// Change this to whatever 4-digit code you want! (e.g., birth year or date)
const CORRECT_PIN = "3006"; 
let enteredPin = "";

// 1. Live Lockscreen Clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock(); // Initial run

// 2. Keypad Functionality
function pressKey(num) {
    if (enteredPin.length < 4) {
        enteredPin += num;
        updateDots();
        
        // Once 4 digits are typed, automatically check it
        if (enteredPin.length === 4) {
            setTimeout(checkPin, 250);
        }
    }
}

function clearPin() {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
}

// 3. Update Visual Dots
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < enteredPin.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 4. Verification Check
function checkPin() {
    const container = document.getElementById('lockWrapper');
    
    if (enteredPin === CORRECT_PIN) {
        // Success! Redirect to the wishes page
        window.location.href = "wishes.html";
    } else {
        // Fail! Shake the lock container to show an error
        container.classList.add('shake');
        
        // Reset everything after animation finishes
        setTimeout(() => {
            container.classList.remove('shake');
            enteredPin = "";
            updateDots();
        }, 400);
    }
}