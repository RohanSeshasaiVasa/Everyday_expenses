const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dots = [];

for (let n=0; n< 60; n++) {
    dots.push({
        x: Math.random() *canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() -0.5,
        vy: Math.random()-0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const dot of dots){
        dot.x +=dot.vx;
        dot.y = dot.y + (dot.vy);

        if (dot.x < 0 || dot.x > canvas.wdth){
            dot.vx = -dot.vx;
        }
        if (dot.y < 0 || dot.y > canvas.height){
            dot.vy = -dot.vy;
        }
        ctx.fillStyle = 'rgba(46, 125, 50, 0.5';
        ctx.fillRect(dot.x, dot.y, 3, 3);
    }

    requestAnimationFrame(animate);
}

animate();