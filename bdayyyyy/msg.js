function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const hint = document.getElementById('envelope-hint');
    
    // Check to ensure we don't accidentally restart the loop animation if tapped twice
    if (envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    
    // Fade out top action alert text cleanly
    hint.style.opacity = '0';
}