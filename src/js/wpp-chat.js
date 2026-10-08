/**
 * INFOKUS - Widget de WhatsApp Interactivo Flotante
 * Permite al usuario escribir un mensaje y enviarlo directamente a WhatsApp.
 */
(function () {
    'use strict';

    const WPP_NUMBER = '573243374019';
    const BUSINESS_NAME = 'INFOKUS Digital';
    const AVATAR_SRC = './src/assets/images/infokusojo.png';

    // --- Crear el HTML del widget ---
    function createWidget() {
        const widget = document.createElement('div');
        widget.id = 'wpp-widget';
        widget.className = 'wpp-widget';
        widget.innerHTML = `
            <!-- Tooltip -->
            <span class="wpp-widget-tooltip" id="wpp-widget-tooltip">💬 Hablemos para posicionar tu negocio</span>

            <!-- Botón flotante toggle -->
            <button id="wpp-widget-toggle" class="wpp-widget-toggle" aria-label="Abrir chat de WhatsApp" title="Escríbenos por WhatsApp">
                <svg class="wpp-toggle-icon-wpp" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <svg class="wpp-toggle-icon-close" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
            </button>

            <!-- Ventana de chat -->
            <div id="wpp-widget-window" class="wpp-widget-window">
                <!-- Header -->
                <div class="wpp-widget-header">
                    <img src="${AVATAR_SRC}" alt="INFOKUS" class="wpp-widget-avatar">
                    <div class="wpp-widget-header-info">
                        <div class="wpp-widget-name">${BUSINESS_NAME}</div>
                        <div class="wpp-widget-status">
                            <span class="wpp-widget-status-dot"></span>
                            En línea · Responde al instante
                        </div>
                    </div>
                    <button id="wpp-widget-close" class="wpp-widget-close-btn" aria-label="Cerrar chat">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
                    </button>
                </div>

                <!-- Cuerpo del chat -->
                <div id="wpp-widget-body" class="wpp-widget-body">
                    <div class="wpp-widget-welcome">
                        <div class="wpp-widget-bubble wpp-widget-bubble-left">
                            ¡Hola! 👋 Bienvenido a <strong>INFOKUS</strong>.<br>
                            ¿En qué podemos ayudarte? Cuéntanos sobre tu proyecto y te respondemos al instante.
                            <div class="wpp-widget-bubble-time">Ahora</div>
                        </div>
                    </div>
                </div>

                <!-- Input de mensaje -->
                <div class="wpp-widget-input-area">
                    <input type="text" id="wpp-widget-input" class="wpp-widget-input" placeholder="Escribe tu mensaje aquí..." autocomplete="off" maxlength="500">
                    <button id="wpp-widget-send" class="wpp-widget-send" aria-label="Enviar mensaje a WhatsApp" title="Enviar a WhatsApp">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>

                <!-- Nota de seguridad -->
                <div class="wpp-widget-footer-note">
                    <svg class="w-3 h-3 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd"/></svg>
                    <span>Tu mensaje se abre en WhatsApp · Cifrado de extremo a extremo</span>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    // --- Obtener hora formateada ---
    function getTime() {
        const now = new Date();
        let h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        const ampm = h >= 12 ? 'p.m.' : 'a.m.';
        h = h % 12 || 12;
        return h + ':' + m + ' ' + ampm;
    }

    // --- Agregar burbuja al chat ---
    function addBubble(text, side) {
        const body = document.getElementById('wpp-widget-body');
        const bubble = document.createElement('div');
        bubble.className = 'wpp-widget-bubble wpp-widget-bubble-' + side;
        bubble.innerHTML = text + '<div class="wpp-widget-bubble-time">' + getTime() + '</div>';
        body.appendChild(bubble);
        // Scroll al fondo
        requestAnimationFrame(() => {
            body.scrollTop = body.scrollHeight;
        });
        return bubble;
    }

    // --- Mostrar indicador de escritura ---
    function showTyping() {
        const body = document.getElementById('wpp-widget-body');
        const typing = document.createElement('div');
        typing.className = 'wpp-widget-bubble wpp-widget-bubble-left wpp-widget-typing';
        typing.id = 'wpp-typing-indicator';
        typing.innerHTML = '<span class="wpp-typing-dots"><span></span><span></span><span></span></span>';
        body.appendChild(typing);
        requestAnimationFrame(() => {
            body.scrollTop = body.scrollHeight;
        });
    }

    function removeTyping() {
        const el = document.getElementById('wpp-typing-indicator');
        if (el) el.remove();
    }

    // --- Enviar mensaje a WhatsApp ---
    function sendToWhatsApp(message) {
        const encodedMsg = encodeURIComponent(message);
        const url = 'https://wa.me/' + WPP_NUMBER + '?text=' + encodedMsg;
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    // --- Inicializar widget ---
    function init() {
        createWidget();

        const toggle = document.getElementById('wpp-widget-toggle');
        const chatWindow = document.getElementById('wpp-widget-window');
        const closeBtn = document.getElementById('wpp-widget-close');
        const input = document.getElementById('wpp-widget-input');
        const sendBtn = document.getElementById('wpp-widget-send');
        const tooltip = document.getElementById('wpp-widget-tooltip');
        const widgetEl = document.getElementById('wpp-widget');

        let isOpen = false;

        function openChat() {
            isOpen = true;
            chatWindow.classList.add('wpp-widget-window--open');
            widgetEl.classList.add('wpp-widget--open');
            // Focus en el input
            setTimeout(() => input.focus(), 400);
        }

        function closeChat() {
            isOpen = false;
            chatWindow.classList.remove('wpp-widget-window--open');
            widgetEl.classList.remove('wpp-widget--open');
        }

        function handleSend() {
            const text = input.value.trim();
            if (!text) return;

            // Agregar burbuja del usuario
            addBubble(text, 'right');
            input.value = '';

            // Mostrar typing de INFOKUS
            setTimeout(() => {
                showTyping();
            }, 400);

            // Respuesta automática + abrir WhatsApp
            setTimeout(() => {
                removeTyping();
                addBubble('¡Perfecto! 🚀 Te estamos redirigiendo a WhatsApp para continuar la conversación...', 'left');

                // Abrir WhatsApp después de un breve delay
                setTimeout(() => {
                    sendToWhatsApp(text);
                }, 800);
            }, 1500);
        }

        // Toggle open/close
        toggle.addEventListener('click', () => {
            if (isOpen) {
                closeChat();
            } else {
                openChat();
            }
        });

        // Close button
        closeBtn.addEventListener('click', closeChat);

        // Send button
        sendBtn.addEventListener('click', handleSend);

        // Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        });

        // Ocultar tooltip cuando se abre el chat
        toggle.addEventListener('mouseenter', () => {
            if (!isOpen) tooltip.classList.add('wpp-widget-tooltip--visible');
        });
        toggle.addEventListener('mouseleave', () => {
            tooltip.classList.remove('wpp-widget-tooltip--visible');
        });

        // Cerrar con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) closeChat();
        });

        // Si la página de contacto tiene el botón de abrir chat
        const openChatBtns = document.querySelectorAll('[data-open-wpp-chat]');
        openChatBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openChat();
            });
        });

        // --- CHAT EMBEBIDO (en la sección de contactanos.html) ---
        initEmbeddedChat();
    }

    // --- Chat embebido en la página de contacto ---
    function initEmbeddedChat() {
        const form = document.getElementById('embedded-chat-form');
        const input = document.getElementById('embedded-chat-input');
        const sendBtn = document.getElementById('embedded-chat-send');
        const chatBody = document.getElementById('embedded-chat-body');

        if (!form || !input || !chatBody) return; // No estamos en contactanos.html

        function addEmbeddedBubble(text, side) {
            const bubble = document.createElement('div');
            bubble.className = 'wpp-bubble wpp-bubble-' + side;
            bubble.innerHTML = text + '<div class="wpp-bubble-time">' + getTime() + '</div>';
            chatBody.appendChild(bubble);
            requestAnimationFrame(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        }

        function showEmbeddedTyping() {
            const typing = document.createElement('div');
            typing.className = 'wpp-bubble wpp-bubble-left wpp-widget-typing';
            typing.id = 'embedded-typing-indicator';
            typing.innerHTML = '<span class="wpp-typing-dots"><span></span><span></span><span></span></span>';
            chatBody.appendChild(typing);
            requestAnimationFrame(() => {
                chatBody.scrollTop = chatBody.scrollHeight;
            });
        }

        function removeEmbeddedTyping() {
            const el = document.getElementById('embedded-typing-indicator');
            if (el) el.remove();
        }

        function handleEmbeddedSend() {
            const text = input.value.trim();
            if (!text) return;

            // Agregar burbuja del usuario
            addEmbeddedBubble(text, 'right');
            input.value = '';

            // Typing indicator
            setTimeout(() => {
                showEmbeddedTyping();
            }, 400);

            // Respuesta + abrir WhatsApp
            setTimeout(() => {
                removeEmbeddedTyping();
                addEmbeddedBubble('¡Genial! 🚀 Te redirigimos a WhatsApp para continuar la conversación en vivo...', 'left');

                setTimeout(() => {
                    sendToWhatsApp(text);
                }, 800);
            }, 1500);
        }

        // Eventos
        sendBtn.addEventListener('click', handleEmbeddedSend);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleEmbeddedSend();
            }
        });

        // Scroll al fondo inicialmente
        requestAnimationFrame(() => {
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
