 {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    user-select: none;
}

body {
    background-color: #05040a;
    color: #f1f5f9;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 15px;
    overflow: hidden;
    position: relative;
}

.orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 8s infinite ease-in-out alternate;
    pointer-events: none;
    z-index: 1;
}

.orb-1 { width: 280px; height: 280px; background: #ff007f; top: -40px; left: -40px; }
.orb-2 { width: 300px; height: 300px; background: #00f2fe; bottom: -60px; right: -40px; animation-delay: -4…
[1:57, 18/9/2026] ♡Kevin♡: let audioCtx = null;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function playSound(type) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
    } else if (type === 'powerup') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(450, now + 0.08);
        osc.frequency.setValueAtTime(600, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    } else if (type === 'heal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'hit') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.25);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
    } else if (type === 'shield_break') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.setValueAtTime(180, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.12);
        osc.frequency.setValueAtTime(783.99, now + 0.24);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
    }
}

const quizQuestions = [
    {
        badge: "Fase 1: Género Narrativo",
        title: "📚 ¿Qué define al Género Narrativo?",
        text: "Elige la respuesta correcta sobre la función principal del género narrativo:",
        options: [
            { text: "Un narrador relata una historia de ficción o realidad donde intervienen personajes en un tiempo y espacio.", correct: true },
            { text: "Expresa exclusivamente los sentimientos íntimos y la subjetividad del autor en verso.", correct: false },
            { text: "Está escrito únicamente para ser representado por actores en un escenario sin narrador.", correct: false }
        ]
    },
    {
        badge: "Fase 2: Género Lírico",
        title: "✍️ ¿Qué caracteriza al Género Lírico?",
        text: "¡Excelente! Ahora demuestra qué sabes sobre la lírica:",
        options: [
            { text: "Relatar acontecimientos históricos de reyes y batallas en capítulos.", correct: false },
            { text: "Transmitir emociones, sensaciones o sentimientos subjetivos respecto a un objeto o sujeto de inspiración, frecuentemente en verso.", correct: true },
            { text: "Presentar un conflicto entre varios personajes mediante diálogos acotados.", correct: false }
        ]
    }
];

const scenes = {
    'cesar_1': {
        badge: "🎻 César - Acto I",
        title: "La Cuerda Rota",
        text: "A 5 minutos del concierto más importante de su vida, la cuerda principal del violín de César se rompe violentamente. ¿Qué decisión toma?",
        options: [
            { text: "1. Salir al escenario y pedir un violín prestado al público.", next: 'cesar_2' },
            { text: "2. Correr a toda prisa a la tienda de música de la esquina.", lose: "Tardaste tanto corriendo que la tienda estaba cerrada. Cuando volviste, el teatro estaba vacío y el concierto fue cancelado." },
            { text: "3. Unir la cuerda rota con un nudo marinero y cinta.", lose: "La cuerda saltó en plena presentación rompiendo el puente del violín. Tuviste que abandonar el escenario entre abucheos." }
        ]
    },
    'cesar_2': {
        badge: "🎻 César - Acto II",
        title: "El Stradivarius Desafinado",
        text: "Un anciano le presta un valioso violín antiguo, pero está completamente desafinado frente a 1,000 espectadores impacientes.",
        options: [
            { text: "1. Afinarlo a oído en segundos usando su oído absoluto.", win: "¡Afinación perfecta! Tocaste con tanta pasión que el público lloró de emoción y el anciano te regaló el instrumento." },
            { text: "2. Pedir 20 minutos de pausa para buscar un afinador digital.", lose: "La impaciencia se apoderó de la sala. El público se retiró molesto y el director canceló la función por falta de profesionalismo." }
        ]
    },
    'sol_1': {
        badge: "🎨 Sol - Acto I",
        title: "El Lienzo Manchado",
        text: "A solo 10 minutos de inaugurar su galería de arte, una gota de pintura negra cae justo en el centro del cuadro principal de Sol. ¿Cómo lo resuelve?",
        options: [
            { text: "1. Integrar la mancha usando trazos negros expresionistas para darle un toque dramático.", next: 'sol_2' },
            { text: "2. Intentar secarla apresuradamente usando un secador de aire caliente.", lose: "El calor derritió todo el óleo del lienzo arruinando la obra por completo. Sol tuvo que retirar su cuadro principal." },
            { text: "3. Pintar todo el fondo de negro para ocultar el accidente.", lose: "El lienzo perdió toda su luz y textura. La obra quedó opaca y los críticos la consideraron aburrida." }
        ]
    },
    'sol_2': {
        badge: "🎨 Sol - Acto II",
        title: "La Mirada del Crítico",
        text: "El crítico de arte más exigente de la ciudad se detiene fascinado frente a los trazos oscuros e imprevistos de la obra.",
        options: [
            { text: "1. Explicarle con convicción que la mancha representa las emociones inesperadas de la vida.", win: "¡El crítico quedó eufórico! Catalogó la obra como una obra maestra del arte moderno y la galería vendió todos sus cuadros." },
            { text: "2. Confesar presa del pánico que fue un simple accidente torpe.", lose: "El crítico sintió decepción ante la falta de seguridad artística y calificó la exposición como una aficionada falta de técnica." }
        ]
    },
    'daniel_1': {
        badge: "🥖 Daniel - Acto I",
        title: "El Horno Apagado",
        text: "Faltan dos horas para entregar el pan artesanal del banquete del Alcalde y el horno de gas principal sufre un apagón repentino. ¿Qué hace Daniel?",
        options: [
            { text: "1. Encender el antiguo horno de leña y ajustar la temperatura manualmente.", next: 'daniel_2' },
            { text: "2. Esperar pacientemente a que llegue el técnico de mantenimiento.", lose: "El técnico llegó demasiado tarde. La masa se fermentó en exceso y perdió toda su textura, cancelando el pedido." },
            { text: "3. Guardar la masa cruda en el congelador para resolverlo mañana.", lose: "El frío mató la levadura activa y al hornearlos quedaron duros como piedras. Daniel perdió su reputación." }
        ]
    },
    'daniel_2': {
        badge: "🥖 Daniel - Acto II",
        title: "El Toque del Maestro",
        text: "El horno de leña está caliente, pero necesita controlar el humo para no quemar la corteza dorada del pan.",
        options: [
            { text: "1. Introducir hierbas de romero en la leña y vaporizar agua sobre las brasas.", win: "¡Perfección absoluta! El pan obtuvo un aroma ahumado único y una corteza crujiente. El Alcalde lo nombró el Panadero Oficial de la Ciudad." },
            { text: "2. Avivar el fuego al máximo para cocinar la masa más rápido.", lose: "El exceso de fuego directo quemó por completo la corteza mientras el centro quedó crudo. El pedido fue rechazado." }
        ]
    }
};

const canvas = document.getElementById('cineCanvas');
const ctx = canvas.getContext('2d');
let animId = null;
let currentQuizStep = 0;
let isQuizFailureMode = false;
let isCaveFailureMode = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function shuffleArray(arr) {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function blendColors(c1, c2, p) {
    let f = parseInt(c1.slice(1), 16),
        t = parseInt(c2.slice(1), 16),
        R1 = f >> 16, G1 = f >> 8 & 0x00FF, B1 = f & 0x0000FF,
        R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
}

function drawTree(cCtx, x, groundY, w, h) {
    cCtx.fillStyle = '#42281d';
    cCtx.fillRect(x - w * 0.1, groundY - h * 0.28, w * 0.2, h * 0.28);
    
    cCtx.fillStyle = '#1b4332';
    cCtx.beginPath();
    cCtx.arc(x, groundY - h * 0.38, w * 0.45, 0, Math.PI * 2);
    cCtx.arc(x - w * 0.18, groundY - h * 0.52, w * 0.35, 0, Math.PI * 2);
    cCtx.arc(x + w * 0.18, groundY - h * 0.52, w * 0.35, 0, Math.PI * 2);
    cCtx.arc(x, groundY - h * 0.72, w * 0.38, 0, Math.PI * 2);
    cCtx.fill();

    cCtx.fillStyle = '#2d6a4f';
    cCtx.beginPath();
    cCtx.arc(x - w * 0.08, groundY - h * 0.42, w * 0.35, 0, Math.PI * 2);
    cCtx.arc(x + w * 0.08, groundY - h * 0.6, w * 0.28, 0, Math.PI * 2);
    cCtx.fill();
}

function drawBridge(cCtx, horizonY) {
    let topW = 90;
    let botW = canvas.width * 0.48;
    let topX = canvas.width / 2;
    let startY = canvas.height;
    let endY = horizonY + 8;

    cCtx.fillStyle = '#1e1b18';
    let pSteps = 4;
    for (let i = 1; i <= pSteps; i++) {
        let t = i / pSteps;
        let py = startY - t * (startY - endY);
        let currentW = botW - t * (botW - topW);
        let pWidth = 10 * (1 - t * 0.4);
        cCtx.fillRect(topX - currentW / 2, py, pWidth, canvas.height - py);
        cCtx.fillRect(topX + currentW / 2 - pWidth, py, pWidth, canvas.height - py);
    }

    let bridgeGrad = cCtx.createLinearGradient(0, startY, 0, endY);
    bridgeGrad.addColorStop(0, '#5c3a21');
    bridgeGrad.addColorStop(1, '#3a2212');
    cCtx.fillStyle = bridgeGrad;

    cCtx.beginPath();
    cCtx.moveTo(topX - botW / 2, startY);
    cCtx.lineTo(topX - topW / 2, endY);
    cCtx.lineTo(topX + topW / 2, endY);
    cCtx.lineTo(topX + botW / 2, startY);
    cCtx.closePath();
    cCtx.fill();

    cCtx.strokeStyle = '#2b180c';
    cCtx.lineWidth = 2;
    let numPlanks = 20;
    for (let i = 0; i <= numPlanks; i++) {
        let t = i / numPlanks;
        let py = startY - t * (startY - endY);
        let currentW = botW - t * (botW - topW);
        cCtx.beginPath();
        cCtx.moveTo(topX - currentW / 2, py);
        cCtx.lineTo(topX + currentW / 2, py);
        cCtx.stroke();
    }

    cCtx.strokeStyle = '#8b5a2b';
    cCtx.lineWidth = 4;
    cCtx.beginPath();
    cCtx.moveTo(topX - botW / 2 + 4, startY);
    cCtx.lineTo(topX - topW / 2 + 2, endY);
    cCtx.moveTo(topX + botW / 2 - 4, startY);
    cCtx.lineTo(topX + topW / 2 - 2, endY);
    cCtx.stroke();

    cCtx.fillStyle = '#422817';
    let numPosts = 8;
    for (let i = 0; i <= numPosts; i++) {
        let t = i / numPosts;
        let py = startY - t * (startY - endY);
        let currentW = botW - t * (botW - topW);
        let h = 22 * (1 - t * 0.5);
        cCtx.fillRect(topX - currentW / 2 + 2, py - h, 5 * (1 - t * 0.4), h);
        cCtx.fillRect(topX + currentW / 2 - 7, py - h, 5 * (1 - t * 0.4), h);
    }
}

function playExitAnimation(callback) {
    document.body.classList.add('in-cinematic');
    canvas.classList.add('active');

    let frame = 0;
    const maxFrames = 260; 
    const pxW = player.w / playerSprite[0].length;
    const pxH = player.h / playerSprite.length;

    let birds = [
        { x: -40, y: canvas.height * 0.20, speed: 3.2, scale: 1.1 },
        { x: -100, y: canvas.height * 0.15, speed: 2.7, scale: 1.3 },
        { x: -160, y: canvas.height * 0.26, speed: 3.5, scale: 0.9 },
        { x: -220, y: canvas.height * 0.22, speed: 2.9, scale: 1.0 }
    ];

    let startY = canvas.height * 0.88;
    let horizonY = canvas.height * 0.64;
    let targetY = horizonY - 15;

    let animPlayer = {
        y: startY,
        scale: 0.85,
        alpha: 1
    };

    function render() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let prog = Math.min(1, frame / (maxFrames * 0.5));

        let skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        let topR = Math.floor(9 + (30 - 9) * prog);
        let topG = Math.floor(9 + (120 - 9) * prog);
        let topB = Math.floor(18 + (225 - 18) * prog);

        let botR = Math.floor(9 + (180 - 9) * prog);
        let botG = Math.floor(9 + (230 - 9) * prog);
        let botB = Math.floor(18 + (255 - 18) * prog);

        skyGrad.addColorStop(0, rgb(${topR}, ${topG}, ${topB}));
        skyGrad.addColorStop(0.75, rgb(${botR}, ${botG}, ${botB}));
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (prog > 0.1) {
            let envAlpha = Math.min(1, (prog - 0.1) / 0.4);
            ctx.save();
            ctx.globalAlpha = envAlpha;

            let sunY = canvas.height * 0.32;
            let sunX = canvas.width * 0.5;
            let sunGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 220);
            sunGrad.addColorStop(0, 'rgba(255, 253, 220, 0.95)');
            sunGrad.addColorStop(0.3, 'rgba(255, 215, 120, 0.45)');
            sunGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = sunGrad;
            ctx.beginPath();
            ctx.arc(sunX, sunY, 220, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1d3557';
            ctx.fillRect(0, horizonY, canvas.width, canvas.height - horizonY);

            ctx.fillStyle = '#457b9d';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, horizonY + 16 * i + 8);
                for (let x = 0; x <= canvas.width; x += 15) {
                    let yWave = Math.sin((frame * 0.05) + (x * 0.02) + i * 1.5) * 4;
                    ctx.lineTo(x, horizonY + 16 * i + 8 + yWave);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.fill();
            }

            drawBridge(ctx, horizonY);

            drawTree(ctx, canvas.width * 0.08, horizonY, 50, 95);
            drawTree(ctx, canvas.width * 0.18, horizonY + 12, 38, 70);
            drawTree(ctx, canvas.width * 0.02, horizonY + 20, 65, 115);

            drawTree(ctx, canvas.width * 0.82, horizonY + 8, 45, 85);
            drawTree(ctx, canvas.width * 0.92, horizonY, 58, 105);

            ctx.strokeStyle = '#1d3557';
            ctx.lineWidth = 2.5;
            ctx.lineCap = 'round';
            birds.forEach(b => {
                b.x += b.speed;
                let wingY = Math.sin(frame * 0.18 + b.x * 0.05) * 7 * b.scale;
                ctx.beginPath();
                ctx.moveTo(b.x - 12 * b.scale, b.y + wingY);
                ctx.quadraticCurveTo(b.x - 6 * b.scale, b.y - 8 * b.scale, b.x, b.y);
                ctx.quadraticCurveTo(b.x + 6 * b.scale, b.y - 8 * b.scale, b.x + 12 * b.scale, b.y + wingY);
                ctx.stroke();
            });

            ctx.restore();
        }

        let totalDist = startY - targetY;
        if (animPlayer.y > targetY) {
            animPlayer.y -= 1.1;
        }

        let currentDist = animPlayer.y - targetY;
        let walkProg = Math.max(0, Math.min(1, 1 - (currentDist / totalDist)));
        let walkBob = Math.sin(frame * 0.3) * 3;

        if (walkProg > 0.8) {
            animPlayer.alpha -= 0.03;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, animPlayer.alpha);
        ctx.translate(canvas.width / 2, animPlayer.y + walkBob);
        ctx.scale(animPlayer.scale, animPlayer.scale);

        let depthSilhouetteProg = Math.min(1, walkProg * 1.2);

        for (let row = 0; row < playerSprite.length; row++) {
            for (let col = 0; col < playerSprite[row].length; col++) {
                const colorKey = playerSprite[row][col];
                if (colorKey !== '_') {
                    let origColor = spritePalette[colorKey];
                    let blendedColor = blendColors(origColor, '#457b9d', depthSilhouetteProg * 0.85);
                    ctx.fillStyle = blendedColor;
                    ctx.fillRect(
                        Math.floor(-player.w / 2 + col * pxW),
                        Math.floor(row * pxH),
                        Math.ceil(pxW),
                        Math.ceil(pxH)
                    );
                }
            }
        }
        ctx.restore();

        if (walkProg > 0.35) {
            let winAlpha = Math.min(1, (walkProg - 0.35) / 0.35);
            ctx.save();
            ctx.globalAlpha = winAlpha;
            ctx.textAlign = 'center';

            ctx.font = '900 48px system-ui';
            ctx.fillStyle = '#ffd166';
            ctx.shadowColor = 'rgba(255, 209, 102, 0.9)';
            ctx.shadowBlur = 25;
            ctx.fillText("🏆 ¡GANASTE! 🏆", canvas.width / 2, canvas.height * 0.28);

            ctx.font = '700 22px system-ui';
            ctx.fillStyle = '#06d6a0';
            ctx.shadowColor = 'rgba(6, 214, 160, 0.8)';
            ctx.shadowBlur = 15;
            ctx.fillText("Alcanzaste la luz de la Verdad", canvas.width / 2, canvas.height * 0.35);
            ctx.restore();
        }

        if (frame < maxFrames) {
            animId = requestAnimationFrame(render);
        } else {
            canvas.classList.remove('active');
            document.body.classList.remove('in-cinematic');
            cancelAnimationFrame(animId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            callback();
        }
    }

    render();
}

function playCinematic(type, textTitle, textSub, callback) {
    document.body.classList.add('in-cinematic');
    canvas.classList.add('active');

    let particles = [];
    let frame = 0;
    const maxFrames = 130;

    const isPositive = (type === 'win' || type === 'next');

    const colorPalette = isPositive
        ? ['#06d6a0', '#ffd166', '#00f2fe', '#ffffff'] 
        : ['#ff0055', '#ff4d6d', '#ffb703', '#111111'];

    for (let i = 0; i < 90; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * (isPositive ? 12 : 18),
            vy: (Math.random() - 0.5) * (isPositive ? 12 : 18),
            size: Math.random() * 8 + 3,
            color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
            alpha: 1,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.2
        });
    }

    function render() {
        frame++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        if (type === 'lose') {
            const shakeX = (Math.random() - 0.5) * 12;
            const shakeY = (Math.random() - 0.5) * 12;
            ctx.translate(shakeX, shakeY);
        }

        ctx.fillStyle = isPositive ? 'rgba(5, 25, 20, 0.85)' : 'rgba(30, 5, 12, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;
            p.alpha -= 0.007;

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });

        ctx.save();
        ctx.textAlign = 'center';
        
        ctx.font = '900 26px system-ui';
        ctx.fillStyle = isPositive ? '#06d6a0' : '#ff0055';
        ctx.shadowColor = isPositive ? 'rgba(6, 214, 160, 0.8)' : 'rgba(255, 0, 85, 0.8)';
        ctx.shadowBlur = 20;
        ctx.fillText(textTitle, canvas.width / 2, canvas.height / 2 - 10);

        ctx.font = '500 14px system-ui';
        ctx.fillStyle = '#cbd5e1';
        ctx.shadowBlur = 0;
        ctx.fillText(textSub, canvas.width / 2, canvas.height / 2 + 25);
        ctx.restore();

        ctx.restore();

        if (frame < maxFrames) {
            animId = requestAnimationFrame(render);
        } else {
            canvas.classList.remove('active');
            document.body.classList.remove('in-cinematic');
            cancelAnimationFrame(animId);
            callback();
        }
    }

    render();
}

const screenIntroQuiz = document.getElementById('screen-intro-quiz');
const screenQuiz = document.getElementById('screen-quiz');
const quizBadge = document.getElementById('quiz-badge');
const quizQuestionTitle = document.getElementById('quiz-question-title');
const quizQuestionText = document.getElementById('quiz-question-text');
const quizChoicesContainer = document.getElementById('quiz-choices-container');

function startQuiz() {
    initAudio();
    currentQuizStep = 0;
    hideAllScreens();
    screenQuiz.classList.remove('hidden');
    loadQuizQuestion();
}

function loadQuizQuestion() {
    const q = quizQuestions[currentQuizStep];
    quizBadge.textContent = q.badge;
    quizQuestionTitle.textContent = q.title;
    quizQuestionText.textContent = q.text;
    quizChoicesContainer.innerHTML = '';

    const shuffledOptions = shuffleArray(q.options);

    shuffledOptions.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = ${index + 1}. ${opt.text};

        btn.onclick = () => {
            initAudio();
            if (opt.correct) {
                playSound('powerup');
                currentQuizStep++;
                if (currentQuizStep < quizQuestions.length) {
                    playCinematic('next', '¡CORRECTO!', 'Avanzando a la prueba de Género Lírico...', () => {
                        loadQuizQuestion();
                    });
                } else {
                    playCinematic('win', '¡PRUEBA SUPERADA!', 'Desbloqueaste el modo "Crea tu Historia"...', () => {
                        hideAllScreens();
                        screenSelect.classList.remove('hidden');
                    });
                }
            } else {
                playSound('hit');
                playCinematic('lose', '¡RESPUESTA INCORRECTA!', 'Revisa la teoría de los géneros e inténtalo de nuevo.', () => {
                    showLose("Fallaste en la trivia literaria. Debes responder correctamente para acceder al creador de historias.", 'quiz');
                });
            }
        };

        quizChoicesContainer.appendChild(btn);
    });
}

const screenSelect = document.getElementById('screen-select');
const screenStory = document.getElementById('screen-story');
const screenAllegory = document.getElementById('screen-allegory');
const screenCave = document.getElementById('screen-cave');
const screenLose = document.getElementById('screen-lose');
const screenWin = document.getElementById('screen-win');

const sceneBadge = document.getElementById('scene-badge');
const sceneTitle = document.getElementById('scene-title');
const sceneText = document.getElementById('scene-text');
const choicesContainer = document.getElementById('choices-container');
const loseTitle = document.getElementById('lose-title');
const loseText = document.getElementById('lose-text');
const winText = document.getElementById('win-text');

function loadScene(key) {
    initAudio();
    const sc = scenes[key];
    if (!sc) return;

    sceneBadge.textContent = sc.badge;
    sceneTitle.textContent = sc.title;
    sceneText.textContent = sc.text;
    choicesContainer.innerHTML = '';

    sc.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.textContent = opt.text;

        btn.onclick = () => {
            initAudio();
            if (opt.next) {
                playSound('powerup');
                playCinematic('next', 'AVANZANDO...', 'Siguiente etapa de la historia...', () => loadScene(opt.next));
            } else if (opt.lose) {
                playSound('hit');
                playCinematic('lose', '¡ERROR FATAL!', 'Consecuencias catastróficas...', () => showLose(opt.lose, 'story'));
            } else if (opt.win) {
                playSound('win');
                playCinematic('win', '¡ÉXITO TOTAL!', 'Has completado la historia del personaje.', () => {
                    showCharacterWin(opt.win);
                });
            }
        };
        choicesContainer.appendChild(btn);
    });

    hideAllScreens();
    screenStory.classList.remove('hidden');
}

function showCharacterWin(winMsg) {
    stopCaveGame();
    winText.textContent = winMsg;

    const winButtons = document.getElementById('win-buttons-container');
    winButtons.innerHTML = `
        <button class="btn btn-restart" onclick="goToSelectScreen()">🎭 Elegir otro personaje</button>
        <button class="btn btn-restart" style="background: linear-gradient(135deg, #a855f7, #7928ca);" onclick="goToAllegoryScreen()">🧗 Pasar al siguiente minijuego</button>
    `;

    hideAllScreens();
    screenWin.classList.remove('hidden');
}

function goToSelectScreen() {
    hideAllScreens();
    screenSelect.classList.remove('hidden');
}

function goToAllegoryScreen() {
    hideAllScreens();
    screenAllegory.classList.remove('hidden');
}

function proceedToCaveMinigame() {
    hideAllScreens();
    startCaveGame();
}

const cCanvas = document.getElementById('caveCanvas');
const cCtx = cCanvas.getContext('2d');
let caveLoopId = null;

const WORLD_HEIGHT = 2400; 
let cameraY = 0;
let fogY = WORLD_HEIGHT + 100;
let fogSpeed = 0.55;

const hitMargin = 5;

let player = { 
    x: 145, y: WORLD_HEIGHT - 70, w: 30, h: 35, 
    vx: 0, vy: 0, 
    grounded: false, facing: 'left',
    shield: false,
    hasDoubleJump: false,
    jumpsLeft: 1,
    lives: 5,
    maxLives: 5,
    invulnerableTimer: 0
};

let platforms = [];
let fallingStones = [];
let powerups = [];
let caveParticles = [];
let slowMoTimer = 0;
let keys = { left: false, right: false };

const spritePalette = {
    'P': '#532d6d',
    'L': '#9a6bb3',
    'Y': '#f3e117',
    'S': '#8b60a5',
    'W': '#ffffff',
    'K': '#121016',
    'R': '#964336'
};

const playerSprite = [
    ["","","","","P","P","","","","","",""],
    ["","","","P","Y","P","P","","","","",""],
    ["","","P","P","Y","P","P","P","","","",""],
    ["","P","P","Y","Y","Y","P","P","P","P","","_"],
    ["P","L","L","Y","Y","Y","L","L","L","L","P","_"],
    ["P","Y","Y","Y","Y","Y","Y","Y","Y","Y","P","_"],
    ["K","P","Y","Y","Y","Y","Y","Y","P","K","",""],
    ["K","K","S","S","K","S","S","S","K","K","",""],
    ["K","K","S","W","K","S","S","S","K","","","_"],
    ["K","R","R","S","S","S","S","K","K","","","_"],
    ["R","R","R","R","R","R","R","K","K","","","_"],
    ["R","R","R","R","R","Y","Y","Y","K","","","_"],
    ["","","R","Y","Y","Y","Y","P","K","","","_"],
    ["","","","K","K","K","K","K","","","","_"]
];

const stonePalette = {
    'K': '#0f172a',
    'G': '#64748b',
    'L': '#94a3b8',
    'D': '#334155'
};

const stoneSprite = [
    ["","","K","K","K","K","",""],
    ["","K","L","L","G","D","K",""],
    ["K","L","L","G","G","D","D","K"],
    ["K","G","G","G","D","D","D","K"],
    ["K","G","D","D","D","D","D","K"],
    ["","K","K","K","K","K","K",""]
];

function generateLevel() {
    platforms = [
        { x: 0, y: WORLD_HEIGHT - 20, w: 320, h: 20 }
    ];

    let currY = WORLD_HEIGHT - 75;

    while (currY > 80) {
        let w = (Math.random() < 0.3) ? 65 : 85;
        let x = Math.floor(Math.random() * (290 - w)) + 15;
        platforms.push({ x: x, y: currY, w: w, h: 14 });

        if (Math.random() < 0.16 && currY < WORLD_HEIGHT - 200) {
            let r = Math.random();
            let pType = 'torch';
            let sym = '🕯️';
            if (r > 0.7) { pType = 'heart'; sym = '❤️'; }
            else if (r > 0.45) { pType = 'wings'; sym = '🪽'; }
            else if (r > 0.25) { pType = 'hourglass'; sym = '⏳'; }
            
            powerups.push({
                x: x + w / 2 - 8,
                y: currY - 22,
                type: pType,
                symbol: sym
            });
        }

        currY -= Math.floor(Math.random() * 20 + 55); 
    }

    platforms.push({ x: 90, y: 65, w: 140, h: 16 });
}

function drawPixelPlatform(cCtx, p, screenY) {
    const x = p.x;
    const y = screenY;
    const w = p.w;
    const h = p.h;
    const blockWidth = 14;
    
    cCtx.fillStyle = '#0f172a';
    cCtx.fillRect(x, y, w, h);

    cCtx.fillStyle = '#334155';
    cCtx.fillRect(x + 1, y + 1, w - 2, h - 2);

    for (let bx = x; bx < x + w; bx += blockWidth) {
        let currentW = Math.min(blockWidth, (x + w) - bx);

        cCtx.fillStyle = '#64748b';
        cCtx.fillRect(bx + 1, y + 3, currentW - 2, 2);

        cCtx.fillStyle = '#1e293b';
        cCtx.fillRect(bx + 1, y + h - 3, currentW - 1, 2);

        if (bx > x) {
            cCtx.fillStyle = '#0f172a';
            cCtx.fillRect(bx, y + 2, 1, h - 3);
        }
    }

    cCtx.fillStyle = '#15803d';
    cCtx.fillRect(x, y, w, 4);

    cCtx.fillStyle = '#22c55e';
    cCtx.fillRect(x + 1, y, w - 2, 2);
}

function jumpPlayer() {
    initAudio();
    if (player.grounded) {
        player.vy = -7.6;
        player.grounded = false;
        player.jumpsLeft = player.hasDoubleJump ? 1 : 0;
        playSound('jump');
    } else if (player.hasDoubleJump && player.jumpsLeft > 0) {
        player.vy = -7.2;
        player.jumpsLeft--;
        playSound('jump');
    }
}

function startCaveGame() {
    initAudio();
    hideAllScreens();
    screenCave.classList.remove('hidden');

    player.x = 145;
    player.y = WORLD_HEIGHT - 65;
    player.vx = 0;
    player.vy = 0;
    player.facing = 'left';
    player.shield = false;
    player.hasDoubleJump = false;
    player.jumpsLeft = 0;
    player.lives = 5;
    player.invulnerableTimer = 0;
    
    fogY = WORLD_HEIGHT + 80;
    fogSpeed = 0.52;
    cameraY = WORLD_HEIGHT - cCanvas.height;
    slowMoTimer = 0;

    fallingStones = [];
    powerups = [];
    
    generateLevel();

    caveParticles = [];
    for (let i = 0; i < 40; i++) {
        caveParticles.push({
            x: Math.random() * cCanvas.width,
            y: Math.random() * cCanvas.height,
            size: Math.random() * 2 + 1,
            vy: Math.random() * 0.3 + 0.1,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');

    btnLeft.ontouchstart = btnLeft.onmousedown = (e) => { 
        if (e && e.cancelable) e.preventDefault(); 
        keys.left = true; 
    };
    btnLeft.ontouchend = btnLeft.onmouseup = (e) => { 
        if (e && e.cancelable) e.preventDefault(); 
        keys.left = false; 
    };

    btnRight.ontouchstart = btnRight.onmousedown = (e) => { 
        if (e && e.cancelable) e.preventDefault(); 
        keys.right = true; 
    };
    btnRight.ontouchend = btnRight.onmouseup = (e) => { 
        if (e && e.cancelable) e.preventDefault(); 
        keys.right = false; 
    };

    btnJump.ontouchstart = btnJump.onmousedown = (e) => {
        if (e && e.cancelable) e.preventDefault();
        jumpPlayer();
    };

    if (caveLoopId) cancelAnimationFrame(caveLoopId);
    caveGameLoop();
}

function handleKeyDown(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') {
        jumpPlayer();
    }
}

function handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
}

function caveGameLoop() {
    if (keys.left) {
        player.vx = -3.2;
        player.facing = 'left';
    } else if (keys.right) {
        player.vx = 3.2;
        player.facing = 'right';
    } else {
        player.vx = 0;
    }

    player.vy += 0.38;
    player.x += player.vx;
    player.y += player.vy;

    if (player.x < 0) player.x = 0;
    if (player.x + player.w > cCanvas.width) player.x = cCanvas.width - player.w;

    if (player.invulnerableTimer > 0) player.invulnerableTimer--;

    player.grounded = false;
    platforms.forEach(p => {
        if (player.x < p.x + p.w &&
            player.x + player.w > p.x &&
            player.y + player.h >= p.y &&
            player.y + player.h <= p.y + p.h + player.vy) {
            player.vy = 0;
            player.y = p.y - player.h;
            player.grounded = true;
        }
    });

    fogY -= fogSpeed;

    if (player.y + player.h - hitMargin > fogY) {
        if (player.invulnerableTimer <= 0) {
            player.lives--;
            player.invulnerableTimer = 60;
            player.vy = -8;
            playSound('hit');

            if (player.lives <= 0) {
                stopCaveGame();
                playCinematic('lose', '¡ATRAPADO POR LA IGNORANCIA!', 'Te has quedado sin vidas envuelto en la oscuridad.', () => {
                    showLose("La Niebla de la Ignorancia consumió todas tus vidas. ¡Sube más rápido la próxima vez!", 'cave');
                });
                return;
            }
        }
    }

    let targetCamY = player.y - cCanvas.height * 0.45;
    targetCamY = Math.max(0, Math.min(WORLD_HEIGHT - cCanvas.height, targetCamY));
    cameraY += (targetCamY - cameraY) * 0.1;

    const speedFactor = (slowMoTimer > 0) ? 0.4 : 1.0;
    if (slowMoTimer > 0) slowMoTimer--;

    if (Math.random() < 0.045 * speedFactor) {
        fallingStones.push({
            x: Math.random() * (cCanvas.width - 20),
            y: cameraY - 20,
            w: 20,
            h: 18,
            speed: (Math.random() * 2.2 + 2.0) * speedFactor
        });
    }

    for (let i = fallingStones.length - 1; i >= 0; i--) {
        let st = fallingStones[i];
        st.y += st.speed;

        if ((player.x + hitMargin) < st.x + st.w &&
            (player.x + player.w - hitMargin) > st.x &&
            (player.y + hitMargin) < st.y + st.h &&
            (player.y + player.h - hitMargin) > st.y) {
            
            if (player.invulnerableTimer <= 0) {
                if (player.shield) {
                    player.shield = false;
                    playSound('shield_break');
                    fallingStones.splice(i, 1);
                    player.invulnerableTimer = 25;
                    continue;
                }

                player.lives--;
                player.invulnerableTimer = 60;
                playSound('hit');
                fallingStones.splice(i, 1);

                if (player.lives <= 0) {
                    stopCaveGame();
                    playCinematic('lose', '¡GOLPEADO POR UNA PIEDRA!', 'Te has quedado sin vidas en la caverna.', () => {
                        showLose("Recibiste demasiados impactos de piedras y perdiste todas tus vidas.", 'cave');
                    });
                    return;
                }
            }
        }

        if (st.y > cameraY + cCanvas.height + 50) fallingStones.splice(i, 1);
    }

    for (let i = powerups.length - 1; i >= 0; i--) {
        let pw = powerups[i];
        if (player.x < pw.x + 18 &&
            player.x + player.w > pw.x &&
            player.y < pw.y + 18 &&
            player.y + player.h > pw.y) {
            
            if (pw.type === 'heart') {
                if (player.lives < player.maxLives) {
                    player.lives++;
                    playSound('heal');
                } else {
                    playSound('powerup');
                }
            } else {
                playSound('powerup');
                if (pw.type === 'torch') player.shield = true;
                if (pw.type === 'wings') player.hasDoubleJump = true;
                if (pw.type === 'hourglass') slowMoTimer = 300;
            }

            powerups.splice(i, 1);
        }
    }

    if (player.y <= 68) {
        stopCaveGame();
        playSound('win');
        screenCave.classList.add('hidden');

        playExitAnimation(() => {
            showFinalCaveWin("¡Enhorabuena! Has superado el largo camino de la caverna, contemplando el horizonte de la Verdad y dejando atrás las sombras de la Ignorancia.");
        });
        return;
    }

    cCtx.fillStyle = '#090912';
    cCtx.fillRect(0, 0, cCanvas.width, cCanvas.height);

    caveParticles.forEach(p => {
        p.y += p.vy;
        if (p.y > cCanvas.height) p.y = 0;
        cCtx.fillStyle = rgba(200, 180, 255, ${p.alpha});
        cCtx.fillRect(p.x, p.y, p.size, p.size);
    });

    platforms.forEach(p => {
        let screenY = p.y - cameraY;
        if (screenY > -30 && screenY < cCanvas.height + 30) {
            drawPixelPlatform(cCtx, p, screenY);
        }
    });

    let screenExitY = 0 - cameraY;
    if (screenExitY < cCanvas.height) {
        cCtx.fillStyle = 'rgba(6, 214, 160, 0.45)';
        cCtx.fillRect(90, screenExitY, 140, 65);
        cCtx.fillStyle = '#06d6a0';
        cCtx.fillRect(90, screenExitY, 140, 8);
    }

    powerups.forEach(pw => {
        let screenY = pw.y - cameraY;
        if (screenY > -30 && screenY < cCanvas.height + 30) {
            cCtx.font = '16px system-ui';
            cCtx.fillText(pw.symbol, pw.x, screenY + 14);
        }
    });

    fallingStones.forEach(st => {
        let screenY = st.y - cameraY;
        if (screenY > -30 && screenY < cCanvas.height + 30) {
            const pxW = st.w / stoneSprite[0].length;
            const pxH = st.h / stoneSprite.length;

            for (let row = 0; row < stoneSprite.length; row++) {
                for (let col = 0; col < stoneSprite[row].length; col++) {
                    const key = stoneSprite[row][col];
                    if (key !== '_') {
                        cCtx.fillStyle = stonePalette[key];
                        cCtx.fillRect(
                            Math.floor(st.x + col * pxW),
                            Math.floor(screenY + row * pxH),
                            Math.ceil(pxW),
                            Math.ceil(pxH)
                        );
                    }
                }
            }
        }
    });

    let screenPlayerY = player.y - cameraY;
    let showPlayerSprite = true;

    if (player.invulnerableTimer > 0) {
        if (Math.floor(player.invulnerableTimer / 6) % 2 === 0) {
            showPlayerSprite = false;
        }
    }

    if (showPlayerSprite) {
        cCtx.save();
        if (player.shield) {
            cCtx.strokeStyle = '#ffd166';
            cCtx.lineWidth = 2;
            cCtx.beginPath();
            cCtx.arc(player.x + player.w / 2, screenPlayerY + player.h / 2, 22, 0, Math.PI * 2);
            cCtx.stroke();
        }

        const pxW = player.w / playerSprite[0].length;
        const pxH = player.h / playerSprite.length;

        for (let row = 0; row < playerSprite.length; row++) {
            for (let col = 0; col < playerSprite[row].length; col++) {
                const colorKey = playerSprite[row][col];
                if (colorKey !== '_') {
                    cCtx.fillStyle = spritePalette[colorKey];
                    let drawCol = (player.facing === 'right') ? (playerSprite[row].length - 1 - col) : col;
                    
                    cCtx.fillRect(
                        Math.floor(player.x + drawCol * pxW),
                        Math.floor(screenPlayerY + row * pxH),
                        Math.ceil(pxW),
                        Math.ceil(pxH)
                    );
                }
            }
        }
        cCtx.restore();
    }

    let screenFogY = fogY - cameraY;
    if (screenFogY < cCanvas.height) {
        let fogGrad = cCtx.createLinearGradient(0, screenFogY - 25, 0, screenFogY + 80);
        fogGrad.addColorStop(0, 'rgba(121, 40, 202, 0)');
        fogGrad.addColorStop(0.35, 'rgba(121, 40, 202, 0.75)');
        fogGrad.addColorStop(1, '#0c0414');

        cCtx.fillStyle = fogGrad;
        cCtx.fillRect(0, screenFogY - 25, cCanvas.width, cCanvas.height - screenFogY + 25);

        cCtx.fillStyle = 'rgba(168, 85, 247, 0.5)';
        for (let x = 0; x < cCanvas.width; x += 20) {
            cCtx.fillRect(x, screenFogY - 20 + Math.sin((Date.now() / 150) + x) * 4, 15, 6);
        }
    }

    const lightRadius = 200 + (1 - player.y / WORLD_HEIGHT) * 100;
    const grad = cCtx.createRadialGradient(
        player.x + player.w / 2, screenPlayerY + player.h / 2, 20,
        player.x + player.w / 2, screenPlayerY + player.h / 2, lightRadius
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
    grad.addColorStop(0.8, 'rgba(5, 5, 12, 0.2)');
    grad.addColorStop(1, 'rgba(5, 5, 12, 0.5)');

    cCtx.fillStyle = grad;
    cCtx.fillRect(0, 0, cCanvas.width, cCanvas.height);

    cCtx.fillStyle = '#fff';
    cCtx.font = '12px system-ui';
    
    let heartsText = '❤️'.repeat(player.lives);
    cCtx.fillText('Vidas: ' + heartsText, 10, 18);

    let hud = 'Poderes: ';
    if (player.shield) hud += '🕯️ ';
    if (player.hasDoubleJump) hud += '🪽 ';
    if (slowMoTimer > 0) hud += '⏳ ';
    if (!player.shield && !player.hasDoubleJump && slowMoTimer === 0) hud += 'Ninguno';
    cCtx.fillText(hud, 10, 36);

    const barX = cCanvas.width - 14;
    const barY = 30;
    const barH = 120;

    cCtx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    cCtx.fillRect(barX, barY, 6, barH);

    cCtx.fillStyle = '#06d6a0';
    cCtx.fillRect(barX - 2, barY, 10, 3);

    let fogBarRatio = Math.max(0, Math.min(1, fogY / WORLD_HEIGHT));
    cCtx.fillStyle = '#a855f7';
    cCtx.fillRect(barX - 1, barY + fogBarRatio * barH, 8, barH * (1 - fogBarRatio));

    let playerBarRatio = Math.max(0, Math.min(1, player.y / WORLD_HEIGHT));
    cCtx.fillStyle = '#ffd166';
    cCtx.fillRect(barX - 3, barY + playerBarRatio * barH - 2, 12, 5);

    caveLoopId = requestAnimationFrame(caveGameLoop);
}

function stopCaveGame() {
    if (caveLoopId) cancelAnimationFrame(caveLoopId);
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
}

function hideAllScreens() {
    screenIntroQuiz.classList.add('hidden');
    screenQuiz.classList.add('hidden');
    screenStory.classList.add('hidden');
    screenAllegory.classList.add('hidden');
    screenCave.classList.add('hidden');
    screenSelect.classList.add('hidden');
    screenLose.classList.add('hidden');
    screenWin.classList.add('hidden');
}

function showLose(msg, failureType) {
    stopCaveGame();
    isQuizFailureMode = (failureType === 'quiz');
    isCaveFailureMode = (failureType === 'cave');
    
    if (failureType === 'cave') {
        loseTitle.textContent = "💥 ¡Te has quedado sin vidas!";
    } else {
        loseTitle.textContent = "Un Trágico Final";
    }
    
    loseText.textContent = msg;
    
    hideAllScreens();
    screenLose.classList.remove('hidden');
}

function showFinalCaveWin(msg) {
    stopCaveGame();
    winText.textContent = msg;

    const winButtons = document.getElementById('win-buttons-container');
    winButtons.innerHTML = `
        <button class="btn btn-restart" onclick="goToSelectScreen()">🌟 Elegir otro personaje</button>
    `;

    hideAllScreens();
    screenWin.classList.remove('hidden');
}

function resetGame() {
    stopCaveGame();
    
    if (isQuizFailureMode) {
        isQuizFailureMode = false;
        startQuiz();
    } else if (isCaveFailureMode) {
        isCaveFailureMode = false;
        startCaveGame();
    } else {
        goToSelectScreen();
    }
}
