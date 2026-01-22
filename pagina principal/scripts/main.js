document.addEventListener('DOMContentLoaded', () => {
	// Modal de detalles
	const modal = document.getElementById('modalDetalles');
	const modalClose = document.getElementById('modalClose');
	const botonesSedes = document.querySelectorAll('.sede-btn-detalles');

	if (modal && modalClose && botonesSedes.length) {
		botonesSedes.forEach(boton => {
			boton.addEventListener('click', function() {
				const contacto = this.getAttribute('data-contacto');
				const email = this.getAttribute('data-email');
				const titulo = this.closest('.sede-card-content')?.querySelector('h3')?.textContent || '';

				document.getElementById('modalTitle').textContent = titulo;
				document.getElementById('modalContacto').textContent = contacto;
				document.getElementById('modalEmail').textContent = email;
				document.getElementById('modalEmail').href = 'mailto:' + email;

				modal.classList.add('active');
			});
		});

		modalClose.addEventListener('click', () => {
			modal.classList.remove('active');
		});

		modal.addEventListener('click', e => {
			if (e.target === modal) {
				modal.classList.remove('active');
			}
		});
	}

	// Botón subir arriba
	const scrollToTopBtn = document.getElementById('scrollToTop');
	if (scrollToTopBtn) {
		window.addEventListener('scroll', () => {
			if (window.pageYOffset > 300) {
				scrollToTopBtn.classList.add('show');
			} else {
				scrollToTopBtn.classList.remove('show');
			}
		});

		scrollToTopBtn.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}

	// Carrusel de políticas
	const track = document.querySelector('.carousel-track');
	const slides = document.querySelectorAll('.carousel-slide');
	const prevBtn = document.querySelector('.carousel-prev');
	const nextBtn = document.querySelector('.carousel-next');
	const indicators = document.querySelectorAll('.indicator');

	if (track && slides.length && prevBtn && nextBtn && indicators.length) {
		let currentIndex = 0;
		let autoplayInterval;

		const showSlide = index => {
			track.style.transform = `translateX(-${index * 100}%)`;
			indicators.forEach((ind, i) => {
				ind.classList.toggle('active', i === index);
			});
		};

		const nextSlide = () => {
			currentIndex = (currentIndex + 1) % slides.length;
			showSlide(currentIndex);
		};

		const startAutoplay = () => {
			autoplayInterval = setInterval(nextSlide, 4000);
		};

		const resetAutoplay = () => {
			clearInterval(autoplayInterval);
			startAutoplay();
		};

		prevBtn.addEventListener('click', () => {
			currentIndex = (currentIndex - 1 + slides.length) % slides.length;
			showSlide(currentIndex);
			resetAutoplay();
		});

		nextBtn.addEventListener('click', () => {
			nextSlide();
			resetAutoplay();
		});

		indicators.forEach((ind, index) => {
			ind.addEventListener('click', () => {
				currentIndex = index;
				showSlide(currentIndex);
				resetAutoplay();
			});
		});

		startAutoplay();
	}
});
