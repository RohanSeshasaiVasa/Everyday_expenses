const scoreBox = document.querySelector('#bubble-score');
let popped = 0;
let best = Number(localStorage.getItem('bestBubbleScore'));
scoreBox.textContent = '🫧 Popped: 0 · Best: ' +best;

function makeBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = 20 + Math.random() *50;
    const duration = 6 + Math.random() *6;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    bubble.style.animationDuration = duration + 's';
    bubble.addEventListener('click', function() {
        if (bubble.classList.contains('pop')) {
            return;
        }

        popped++;
        if (popped > best){
            best = popped;
            localStorage.setItem('bestBubbleScore', best);
        }
        scoreBox.textContent = '🫧 Popped: ' + popped + ' . Best: ' +best;

        bubble.classList.add('pop');
        setTimeout(function() {
            bubble.remove();
        }, 300);
    });
    document.body.appendChild(bubble);
    setTimeout(function(){
        bubble.remove();
    }, duration * 1000);
}

setInterval(makeBubble, 1200);
