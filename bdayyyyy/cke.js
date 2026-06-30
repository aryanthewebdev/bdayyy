let blown = false;

function blowCandle() {
    if (blown) return; 
    blown = true;

    // 1. Instantly hide all flames by targeting the flame class safely
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.display = 'none';
    });
    
    // 2. Reveal greeting text and next page button
    document.getElementById('instruction').classList.add('hidden');
    document.getElementById('birthday-greeting').classList.remove('hidden');
    document.getElementById('next-action').classList.remove('hidden');

    // 3. Fire corner party bangers
    fireBanger(0);   
    fireBanger(100); 
    
    // 4. Start continuously launching balloons
    setInterval(spawnBalloon, 400);
}

function fireBanger(startXPercent) {
    const container = document.getElementById('party-container');
    const colors = ['#ff6b81', '#70a1ff', '#2ed573', '#ffa502', '#ffffff', '#ea80fc'];
    
    for (let i = 0; i < 60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        confetti.style.setProperty('--start-x', startXPercent + '%');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.setProperty('--radius', Math.random() > 0.5 ? '50%' : '0%');
        
        const destY = Math.random() * 60 + 20 + 'vh';
        let destX = startXPercent === 0 ? (Math.random() * 60) + 'vw' : (100 - Math.random() * 60) + 'vw';
        
        confetti.style.setProperty('--dest-y', destY);
        confetti.style.setProperty('--dest-x', destX);
        
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1400);
    }
}

function spawnBalloon() {
    const container = document.getElementById('party-container');
    if (!container) return;
    
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    
    const colors = ['#ff4757', '#2e90ff', '#2ed573', '#ffa502', '#ea80fc', '#ff6b81'];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.left = Math.random() * 85 + 'vw';
    
    const sizeFactor = Math.random() * 0.4 + 0.8;
    balloon.style.transform = `scale(${sizeFactor})`;
    
    const drift = (Math.random() * 50 - 25) + 'vw';
    balloon.style.setProperty('--drift', drift);
    
    container.appendChild(balloon);
    setTimeout(() => balloon.remove(), 4500);
}