document.addEventListener('DOMContentLoaded', () => {
	const menuToggle = document.getElementById('menu-toggle');
	const menu = document.getElementById('menu');

	menuToggle.addEventListener('click', () => {
		menu.classList.toggle('active');
		if (menu.classList.contains('active')) {
			menu.style.display = 'flex';
		} else {
			menu.style.display = 'none';
		}
	});
});
