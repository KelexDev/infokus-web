// Layered animation of the user's reference image with genuine alpha transparency.
const stage = document.getElementById('infokus-robot');
const greetButton = document.getElementById('foki-greet');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

if (stage && greetButton) {
    const imageUrl = new URL('../images/foki-transparent.png', import.meta.url).href;
    const illustration = new Image();
    illustration.src = imageUrl;
    illustration.decode().then(() => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '130 0 960 1110');
        svg.setAttribute('class', 'foki-illustration');
        svg.setAttribute('aria-hidden', 'true');
        svg.innerHTML = `
            <defs>
                <mask id="foki-body-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254">
                    <rect width="1254" height="1254" fill="white"/>
                    <path d="M185 446 L229 440 L231 402 L337 399 L345 452 L344 475 L358 487 L379 470 L403 471 L415 487 L408 506 L385 535 L373 565 L371 598 Q325 625 278 600 L237 560 L185 518 Z" fill="black"/>
                </mask>
                <clipPath id="foki-hand-clip" clipPathUnits="userSpaceOnUse">
                    <path d="M185 446 L229 440 L231 402 L337 399 L345 452 L344 475 L358 487 L379 470 L403 471 L415 487 L408 506 L385 535 L373 565 L376 613 Q325 641 274 611 L237 560 L185 518 Z"/>
                </clipPath>
                <radialGradient id="foki-lid-fill" cx="40%" cy="30%" r="90%">
                    <stop offset="0" stop-color="#252831"/>
                    <stop offset="1" stop-color="#161a23"/>
                </radialGradient>
                <clipPath id="foki-left-eye"><ellipse rx="78" ry="88"/></clipPath>
                <clipPath id="foki-right-eye"><ellipse rx="76" ry="87"/></clipPath>
            </defs>
            <g data-foki-rig>
                <image href="${imageUrl}" width="1254" height="1254" mask="url(#foki-body-mask)"/>
                <g data-foki-hand>
                    <image href="${imageUrl}" width="1254" height="1254" clip-path="url(#foki-hand-clip)"/>
                </g>
                <g transform="translate(531 326) rotate(19)" clip-path="url(#foki-left-eye)">
                    <rect data-foki-lid-top x="-80" y="-90" width="160" height="0" fill="url(#foki-lid-fill)"/>
                    <rect data-foki-lid-bottom x="-80" y="90" width="160" height="0" fill="url(#foki-lid-fill)"/>
                    <path data-foki-closed-eye d="M-55 30 Q0 65 55 30" fill="none" stroke="#72c8ff" stroke-width="5" stroke-linecap="round" opacity="0"/>
                </g>
                <g transform="translate(784 394) rotate(25)" clip-path="url(#foki-right-eye)">
                    <rect data-foki-lid-top x="-80" y="-90" width="160" height="0" fill="url(#foki-lid-fill)"/>
                    <rect data-foki-lid-bottom x="-80" y="90" width="160" height="0" fill="url(#foki-lid-fill)"/>
                    <path data-foki-closed-eye d="M-55 30 Q0 65 55 30" fill="none" stroke="#72c8ff" stroke-width="5" stroke-linecap="round" opacity="0"/>
                </g>
            </g>`;
        stage.appendChild(svg);
        const rig = svg.querySelector('[data-foki-rig]');
        const hand = svg.querySelector('[data-foki-hand]');
        const upperLids = svg.querySelectorAll('[data-foki-lid-top]');
        const lowerLids = svg.querySelectorAll('[data-foki-lid-bottom]');
        const closedEyes = svg.querySelectorAll('[data-foki-closed-eye]');
        let frame = 0, elapsed = 0, previous = null, inView = true;
        let waveStart = 0, nextWave = 7, blinkStart = -10, nextBlink = 2.2;
        let pointerX = 0, currentX = 0;

        function pose(time, delta) {
            const reduced = motionPreference.matches;
            const float = reduced ? 0 : Math.sin(time * 1.25) * 17;
            currentX += (pointerX - currentX) * (1 - Math.exp(-4 * delta));
            const tilt = reduced ? 0 : Math.sin(time * 0.65) * 0.45 + currentX * 0.6;
            rig.setAttribute('transform', `translate(0 ${float}) rotate(${tilt} 620 580)`);
            if (!reduced && time >= nextWave) {
                waveStart = time;
                nextWave = time + 7 + Math.random() * 2;
            }
            const age = time - waveStart;
            const envelope = !reduced && age >= 0 && age < 2.7
                ? Math.pow(Math.sin(age / 2.7 * Math.PI), 2) : 0;
            hand.setAttribute('transform', `rotate(${Math.sin(age * 7.2) * envelope * 8} 323 599)`);
            if (!reduced && time >= nextBlink) {
                blinkStart = time;
                nextBlink = time + 3.1 + Math.random() * 2.4;
            }
            const blinkAge = time - blinkStart;
            let closure = 0;
            if (!reduced && blinkAge >= 0 && blinkAge < 0.24) {
                const phase = blinkAge < 0.09 ? blinkAge / 0.09 : 1 - (blinkAge - 0.09) / 0.15;
                closure = phase * phase * (3 - 2 * phase);
            }
            upperLids.forEach(lid => lid.setAttribute('height', closure * 151));
            closedEyes.forEach(eye => eye.setAttribute('opacity', Math.pow(closure, 6)));
            lowerLids.forEach(lid => {
                lid.setAttribute('height', closure * 30);
                lid.setAttribute('y', 90 - closure * 30);
            });
        }
        function tick(now) {
            frame = 0;
            if (!inView || document.hidden) { previous = null; return; }
            const delta = previous === null ? 0 : Math.min((now - previous) / 1000, 0.06);
            previous = now;
            elapsed += delta;
            pose(elapsed, delta);
            if (!motionPreference.matches) frame = requestAnimationFrame(tick);
        }
        function resume() {
            if (!frame && inView && !document.hidden) frame = requestAnimationFrame(tick);
        }
        function greet() {
            const bubble = document.getElementById('robot-speech');
            if (bubble && !motionPreference.matches) {
                bubble.classList.add('is-greeting');
                setTimeout(() => bubble.classList.remove('is-greeting'), 900);
            }
            // Let the active wave finish to avoid snapping the wrist back to its origin.
            if (elapsed - waveStart >= 2.7) waveStart = elapsed;
            nextWave = elapsed + 7;
            resume();
        }
        greetButton.addEventListener('click', greet);
        stage.addEventListener('pointerenter', greet);
        stage.addEventListener('pointermove', event => {
            const bounds = stage.getBoundingClientRect();
            pointerX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
        });
        stage.addEventListener('pointerleave', () => { pointerX = 0; });
        document.addEventListener('visibilitychange', () => { previous = null; resume(); });
        motionPreference.addEventListener('change', () => { previous = null; pose(elapsed, 0); resume(); });
        const visibility = new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            if (!inView && frame) { cancelAnimationFrame(frame); frame = 0; previous = null; }
            resume();
        });
        visibility.observe(stage);
        pose(0, 0);
        stage.classList.add('foki-ready');
        greetButton.hidden = false;
        resume();
    }).catch(error => {
        console.warn('FOKI: se muestra la imagen transparente de respaldo.', error);
    });
}
