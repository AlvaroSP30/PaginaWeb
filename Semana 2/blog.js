document.addEventListener('DOMContentLoaded', () => {
    // 1. Actualizar dinámicamente el año en el footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Añadir funcionalidad de copiar al portapapeles para los bloques de código Emmet
    const emmetCodeBlocks = document.querySelectorAll('.emmet-code-block');

    emmetCodeBlocks.forEach(codeBlock => {
        // Crear un botón "Copiar"
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copiar';
        copyButton.className = 'ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 opacity-0 transition-opacity duration-200'; // Inicialmente invisible

        // Insertar el botón junto al bloque de código
        codeBlock.parentNode.insertBefore(copyButton, codeBlock.nextSibling);

        // Mostrar/ocultar botón al pasar el mouse sobre el bloque de código (y el botón)
        const parentContainer = codeBlock.parentNode; // El div.bg-gray-100 o similar
        parentContainer.style.position = 'relative'; // Necesario para posicionamiento absoluto si se quisiera mejorar visualmente

        parentContainer.addEventListener('mouseenter', () => {
            copyButton.classList.remove('opacity-0');
        });

        parentContainer.addEventListener('mouseleave', () => {
            // Solo ocultar si el mouse no está sobre el botón
            if (!copyButton.matches(':hover')) {
                copyButton.classList.add('opacity-0');
            }
        });

        copyButton.addEventListener('click', () => {
            const codeToCopy = codeBlock.textContent.trim();
            
            // Usar la API de Clipboard (más moderna y recomendada)
            navigator.clipboard.writeText(codeToCopy)
                .then(() => {
                    copyButton.textContent = '¡Copiado!';
                    copyButton.style.backgroundColor = '#4CAF50'; // Un verde para indicar éxito
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                        copyButton.style.backgroundColor = ''; // Restaurar color original o dejar Tailwind manejarlo
                        copyButton.classList.add('opacity-0'); // Ocultar después de un tiempo
                    }, 1500); // 1.5 segundos
                })
                .catch(err => {
                    console.error('Error al copiar el texto: ', err);
                    // Fallback para navegadores antiguos o si falla la API
                    const textArea = document.createElement('textarea');
                    textArea.value = codeToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    textArea.remove();
                    
                    copyButton.textContent = '¡Copiado! (Fallback)';
                    copyButton.style.backgroundColor = '#4CAF50';
                    setTimeout(() => {
                        copyButton.textContent = 'Copiar';
                        copyButton.style.backgroundColor = '';
                        copyButton.classList.add('opacity-0');
                    }, 1500);
                });
        });
        
        // Mantener el botón visible si el mouse está sobre él después de salir del contenedor principal
        copyButton.addEventListener('mouseleave', () => {
            parentContainer.dispatchEvent(new Event('mouseleave')); // Simula el mouseleave en el padre para ocultarlo
        });
    });
});