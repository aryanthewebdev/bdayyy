let dinoTriggered = false;
let eggClicks = 0;
let score = 0;
let gameActive = false;
let fruitInterval;

// References to DOM assets
const gameStage = document.getElementById('gameStage');
const elephant = document.getElementById('elephant');
const scoreVal = document.getElementById('score-val');
const gameStatus = document.getElementById('game-status');

/* --- STAGE 1: DINO SEQUENCE --- */
function triggerDinoSequence() {
    if (dinoTriggered) return;
    dinoTriggered = true;

    const dino = document.getElementById('dino');
    const egg = document.getElementById('egg');

    gameStatus.innerText = "Oh wow! Look at the left side! 🦖";
    dino.classList.add('dino-walks');

    // Dino reaches center point drop milestone
    setTimeout(() => {
        egg.classList.remove('hidden');
    }, 1400);

    // Dino leaves right flank clearing out map view
    setTimeout(() => {
        dino.remove();
        gameStatus.innerText = "Tap the mysterious egg 3 times! 🥚🔍";
    }, 3500);
}

/* --- STAGE 2: HATCHING THE EGG --- */
function clickEgg(event) {
    event.stopPropagation(); // Restrains base grid triggers
    if (eggClicks >= 3) return;

    eggClicks++;
    const egg = document.getElementById('egg');

    egg.classList.remove('egg-shake');
    void egg.offsetWidth; // Force frame updates
    egg.classList.add('egg-shake');

    if (eggClicks === 1) gameStatus.innerText = "It's trembling... 🍳";
    if (eggClicks === 2) gameStatus.innerText = "SOMETHING IS COMING!! 🔥";

    if (eggClicks === 3) {
        egg.remove();
        elephant.classList.remove('hidden');
        document.getElementById('score-wrapper').classList.remove('hidden');
        gameStatus.innerText = "FEED THE ELEPHANT! Slide him left & right! 🐘🍉";
        
        // Audio execution safety check hook
        const audio = document.getElementById('hatch-audio');
        audio.play().catch(e => console.log("Audio waiting on gesture permissions setup:", e));

        // Launch Game Engines
        gameActive = true;
        initTouchControls();
        fruitInterval = setInterval(spawnFruit, 900); // Rains fruits down every 900ms
    }
}

/* --- STAGE 3: TOUCH CONTROL MECHANICS --- */
function initTouchControls() {
    // Tracks finger drag movement seamlessly across mobile screens
    const handleMove = (e) => {
        if (!gameActive) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const stageBounds = gameStage.getBoundingClientRect();
        
        // Map spatial position coordinates relative to inner viewport frame
        let relativeX = clientX - stageBounds.left - 40; // Center offset adjustment
        
        // Containment wall bounds protection
        if (relativeX < 0) relativeX = 0;
        if (relativeX > stageBounds.width - 80) relativeX = stageBounds.width - 80;

        elephant.style.left = relativeX + 'px';
    };

    // Support both mouse dragging and mobile finger touches
    gameStage.addEventListener('mousemove', handleMove);
    gameStage.addEventListener('touchmove', handleMove, { passive: true });
}

/* --- STAGE 4: FALLING FRUITS GENERATOR --- */
function spawnFruit() {
    if (!gameActive) return;

    const fruitsList = ['🍎', '🍌', '🍓', '🍉', '🍍', '🍇', '🍒'];
    const randomFruit = fruitsList[Math.floor(Math.random() * fruitsList.length)];
    
    const fruitElement = document.createElement('div');
    fruitElement.classList.add('fruit');
    fruitElement.innerText = randomFruit;
    
    // Position randomly along top edge
    const stageWidth = gameStage.getBoundingClientRect().width;
    fruitElement.style.left = Math.random() * (stageWidth - 40) + 'px';
    gameStage.appendChild(fruitElement);

    let currentTop = -50;
    const fallSpeed = Math.random() * 4 + 3; // Random acceleration speed variables

    function fallLoop() {
        if (!gameActive) {
            fruitElement.remove();
            return;
        }

        currentTop += fallSpeed;
        fruitElement.style.top = currentTop + 'px';

        // Check for collision or bottom floor exit bounds
        const stageHeight = gameStage.getBoundingClientRect().height;
        
        if (currentTop > stageHeight - 100) {
    // Read coordinate configurations to determine hits
    const elephantLeft = parseFloat(elephant.style.left || (stageWidth * 0.4));
    const fruitLeft = parseFloat(fruitElement.style.left);

    // If the horizontal positioning bounds line up together (A Catch!)
    if (fruitLeft >= elephantLeft - 25 && fruitLeft <= elephantLeft + 65) {
        score++;
        scoreVal.innerText = score;
        gameStatus.innerText = `Yum! Caught a ${fruitElement.innerText}! 🎉`;
        fruitElement.remove();

        // REDIRECT TO THE STANDALONE FINALE PAGE AT 15 POINTS
        if (score === 15) {
            gameActive = false;
            clearInterval(fruitInterval);

            // Pause the background tracks
            const audio = document.getElementById('hatch-audio');
            audio.pause();

            // Give a 500ms delay for suspense, then jump to the final page!
            setTimeout(() => {
                window.location.href = "chore-time.html";
            }, 500);
        }
        return;
    }
}

        // Clean up out of bounds objects falling under floor
        if (currentTop < stageHeight) {
            requestAnimationFrame(fallLoop);
        } else {
            fruitElement.remove();
        }
    }

    requestAnimationFrame(fallLoop);
}