let display = document.getElementById('display');
let current = '';

function press(val) {
    // Replace ^ with ** for exponentiation
    if (val === '^') {
        current += '**';
    } else {
        current += val;
    }
    display.value = current;
}
// Button ripple animation
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Shooting stars animation
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * (window.innerHeight * 0.5) + 'px';
    document.querySelector('.stars').appendChild(star);
    setTimeout(() => star.remove(), 1200);
}
setInterval(() => {
    if (document.querySelector('.stars')) {
        createStar();
    }
}, 400);

// Car race speed meter entrance effect
window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('speed-meter-modal');
    const needle = document.getElementById('needle');
    const speedValue = document.getElementById('speed-value');
    const energyBar = document.getElementById('energy-bar');
    let speed = 0;
    let angle = -60;
    modal.style.display = 'flex';
    const interval = setInterval(() => {
        if (speed < 220) {
            speed += Math.floor(Math.random() * 30) + 10;
            if (speed > 220) speed = 220;
            angle = -60 + (speed / 220) * 120;
            needle.style.transform = `rotate(${angle}deg)`;
            speedValue.textContent = speed + ' km/h';
            // Animate energy bar width (sync with speed)
            const energyPercent = Math.floor((speed / 220) * 100);
            energyBar.style.width = energyPercent + '%';
        } else {
            clearInterval(interval);
            setTimeout(() => {
                modal.style.display = 'none';
            }, 700);
        }
    }, 80);
});

function clearDisplay() {
    current = '';
    display.value = '';
}

function calculate() {
    try {
        // Replace log(x) with Math.log10(x), sqrt(x) with Math.sqrt(x)
        let expr = current
            .replace(/log\(/g, 'Math.log10(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(');
        let result = eval(expr);
        display.value = result;
        current = result.toString();
    } catch {
        display.value = 'Error';
        current = '';
    }
}
