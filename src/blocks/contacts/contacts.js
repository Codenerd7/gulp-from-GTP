document.addEventListener('DOMContentLoaded', () => {
	const toggleInfoButton = document.getElementById('toggle-info');
	const additionalInfo = document.getElementById('additional-info');

	toggleInfoButton.addEventListener('click', () => {
		additionalInfo.classList.toggle('visible');
		if (additionalInfo.classList.contains('visible')) {
			additionalInfo.style.display = 'block';
			toggleInfoButton.textContent = 'Less Info';
		} else {
			additionalInfo.style.display = 'none';
			toggleInfoButton.textContent = 'More Info';
		}
	});
});
