// Efecto de scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar el color de la barra de navegación al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Manejar el envío del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !message) {
            alert('Por favor complete todos los campos requeridos.');
            return;
        }
        
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', { name, email, subject, message });
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
        
        // Limpiar el formulario
        contactForm.reset();
    });
}

// Animación para las tarjetas de habilidades al aparecer en el viewport
const skillItems = document.querySelectorAll('.skill-item');

const animateSkills = () => {
    skillItems.forEach((item, index) => {
        const itemPosition = item.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (itemPosition < screenPosition) {
            item.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        }
    });
};

// Agregar estilos de animación dinámicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Ejecutar la animación al cargar y al hacer scroll
window.addEventListener('load', animateSkills);
window.addEventListener('scroll', animateSkills);