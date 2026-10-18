const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let lastTrailTime = 0;

document.addEventListener('mousemove', function(event) {
    const x = event.clientX + 'px';
    const y = event.clientY + 'px';

    cursorDot.style.left = x;
    cursorDot.style.top = y;
    cursorRing.style.left = x;
    cursorRing.style.top = y;

    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';

    const overClickable  = event.target.closest('button, select, input');
    cursorRing.classList.toggle('hover', overClickable !== null);
});

document.addEventListener('mousedown', function() {
    cursorRing.classList.add('click');
});

document.addEventListener('mouseup', function() {
    cursorRing.classList.remove('click');
});

document.documentElement.addEventListener('mouseout', function(event) {
    if (event.relatedTarget === null) {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
    }
});

document.addEventListener('mousemove', function(event) {
    const now = Date.now();
    if (now - lastTrailTime < 25) {
        return;
    }
    lastTrailTime = now;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = event.clientX + 'px';
    trail.style.top = event.clientY + 'px';
    document.body.appendChild(trail);

    setTimeout(function() {
        trail.remove();
    }, 600);
}); 