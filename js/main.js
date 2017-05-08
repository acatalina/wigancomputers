const removeOnScroll = document.querySelectorAll('#remove');

window.addEventListener('scroll', (e) => {
  if (window.scrollY < 300) {
    removeOnScroll.forEach(elem => {
      elem.classList.remove('remove-active');
    });
  } else {
    removeOnScroll.forEach(elem => {
      elem.classList.add('remove-active');
    });
  }
});

function scrollIt (destination, duration = 200, easing = 'easeInOutQuart', callback) {
  const easings = {
    easeInOutQuart (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop - 85;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll () {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

document.querySelector('.logo').addEventListener('click', () => scrollIt(0));

document.querySelector('.about-link').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.about'),
    500,
    'easeInOutQuart'
  );
});

document.querySelector('.contact-link').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.contact'),
    500,
    'easeInOutQuart'
  );
});

