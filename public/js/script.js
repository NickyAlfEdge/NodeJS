const buttons = document.getElementsByClassName('navigation-button');

if (buttons.length > 0) {
  for (const button of buttons) {
    button.addEventListener('click', (event) => {
      const span = button.getElementsByTagName('span')[0];

      if (span.classList.contains('hidden')) {
        for (const button of buttons) {
          const span = button.getElementsByTagName('span')[0];
          span.classList.add('hidden');
        }
        span.classList.remove('hidden');
      }
    });
  }
}
