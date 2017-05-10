var removeOnScroll = document.querySelectorAll('.remove');

function removeHandler () {
  if (window.scrollY < 300) {
    removeOnScroll.forEach(function (elem) {
      elem.classList.remove('remove-active');
    });
  } else {
    removeOnScroll.forEach(function (elem) {
      elem.classList.add('remove-active');
    });
  }
}

window.addEventListener('scroll', removeHandler);

function scrollIt (destination, duration = 200, callback) {
  function easeInOutQuart (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }
  
  var start = window.pageYOffset;
  var startTime = window.performance.now ? performance.now() : new Date().getTime();
  var offset = screen.width >= 768 ? 65 : 110;

  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop -  offset;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if (window.requestAnimationFrame === false) {
    window.scroll(0, destinationOffsetToScroll);
    
    if (callback) {
      callback();
    }
    return;
  }

  function scroll () {
    var now = window.performance.now ? performance.now() : new Date().getTime();
    var time = Math.min(1, ((now - startTime) / duration));
    var timeFunction = easeInOutQuart(time);

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

function scrollToTop () {
  scrollIt(0);
}

function scrollToTarget () {
  var target = this.dataset.target;
  
  scrollIt(
    document.querySelector(target),
    500
  );
}

document.querySelectorAll('.logo').forEach(function (elem) {
  elem.addEventListener('click', scrollToTop);
});

document.querySelector('.about-link').addEventListener('click', scrollToTarget);

document.querySelector('.contact-link').addEventListener('click', scrollToTarget);