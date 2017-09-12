/** Social Sharing **/
jQuery(document).ready(function($) {
  function getFBShares(page) {
    var shares;
    $.getJSON('https://graph.facebook.com/?ids=' + page, function(data) {
      if (data[page].share) {
        shares = data[page].share.share_count;
        $('#sharing #facebook .count').html(shares);
      }
    });
  }

  function getTweets(page) {
    var tweets;
    $.getJSON('https://public.newsharecounts.com/count.json?url=' + page + '&callback=?', function(data) {
      if (data) {
        tweets = data.count;
        $('#sharing #twitter .count').html(tweets || '0');
      }
    });
  }

  function getLinkedIn(page) {
    var linkedinCount = 0;
    $.getJSON('https://www.linkedin.com/countserv/count/share?url=' + page + '&callback=?', function(data) {
      if (data.count) {
        linkedinCount += data.count;
      }
      $('#sharing #linkedin .count').html(linkedinCount);
    });
  }

  var Url = 'https://spectral.prototypo.io';
  var UrlEncoded = encodeURIComponent(Url);
  var titleTwitter = encodeURIComponent('Discover Spectral, the first parametric Google font by @prototypoApp!');
  var titleLinkedin = encodeURIComponent('Discover Spectral, the first parametric Google font by @Prototypo!');
  getFBShares(Url);
  getTweets(Url);
  getLinkedIn(Url);
  $('#facebook a').attr('href', 'http://www.facebook.com/share.php?u=' + UrlEncoded);
  $('#twitter a').attr('href', 'http://twitter.com/home?status=' + titleTwitter + ' ' + UrlEncoded);
  $('#googleplus a').attr('href', 'https://plus.google.com/share?url=' + UrlEncoded);
  $('#linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + UrlEncoded + '&title=' + titleLinkedin);
});

/** Utilities **/
function getValue(min, max, percent) {
  return ((percent / 100) * (max - min)) + min;
}

/** Browser checking **/
var parser = new UAParser();
// by default it takes ua string from current browser's window.navigator.userAgent
if (parser.getDevice().type) {
  $('#mobileHelper').show();
}

var browserName = parser.getBrowser().name;
if (browserName === 'Trident' || browserName === 'IE') {
  $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
}

/** Modal management **/
var Modal = (function() {

    var trigger = $qsa('.modal__trigger'); // what you click to activate the modal
    var modals = $qsa('.modal'); // the entire modal (takes up entire window)
    var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
    var content = $qsa('.modal__content'); // the inner content of the modal
    var closers = $qsa('.modal__close'); // an element used to close the modal
    var w = window;
    var isOpen = false;
    var contentDelay = 0; // duration after you click the button and wait for the content to show
    var len = trigger.length;

    // make it easier for yourself by not having to type as much to select an element
    function $qsa(el) {
      return document.querySelectorAll(el);
    }

    var getId = function(event) {

      event.preventDefault();
      var self = this;
      // get the value of the data-modal attribute from the button
      var modalId = self.dataset.modal;
      var len = modalId.length;
      // remove the '#' from the string
      var modalIdTrimmed = modalId.substring(1, len);
      // select the modal we want to activate
      var modal = document.getElementById(modalIdTrimmed);
      // execute function that creates the temporary expanding div
      makeDiv(self, modal);
    };

    var makeDiv = function(self, modal) {

      var fakediv = document.getElementById('modal__temp');

      /**
       * if there isn't a 'fakediv', create one and append it to the button that was
       * clicked. after that execute the function 'moveTrig' which handles the animations.
       */

      if (fakediv === null) {
        var div = document.createElement('div');
        div.id = 'modal__temp';
        self.appendChild(div);
        moveTrig(self, modal, div);
      }
    };

    var moveTrig = function(trig, modal, div) {
      var trigProps = trig.getBoundingClientRect();
      var m = modal;
      var mProps = m.querySelector('.modal__content').getBoundingClientRect();
      var transX, transY, scaleX, scaleY;
      var xc = w.innerWidth / 2;
      var yc = w.innerHeight / 2;

      // this class increases z-index value so the button goes overtop the other buttons
      trig.classList.add('modal__trigger--active');

      // these values are used for scale the temporary div to the same size as the modal
      scaleX = mProps.width / trigProps.width;
      scaleY = mProps.height / trigProps.height;

      scaleX = scaleX.toFixed(3); // round to 3 decimal places
      scaleY = scaleY.toFixed(3);


      // these values are used to move the button to the center of the window
      transX = Math.round(xc - trigProps.left - trigProps.width / 2);
      transY = Math.round(yc - trigProps.top - trigProps.height / 2);

      // if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
      if (m.classList.contains('modal--align-top')) {
        transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
      }

      window.requestAnimationFrame(function() {
        open(m, div);
      });

    };

    var open = function(m, div) {

      if (!isOpen) {
        // select the content inside the modal
        var content = m.querySelector('.modal__content');
        // reveal the modal
        m.classList.add('modal--active');
        // reveal the modal content
        content.classList.add('modal__content--active');

        /**
         * when the modal content is finished transitioning, fadeout the temporary
         * expanding div so when the window resizes it isn't visible ( it doesn't
         * move with the window).
         */

        content.addEventListener('transitionend', hideDiv, false);

        isOpen = true;
      }

      function hideDiv() {
        // fadeout div so that it can't be seen when the window is resized
        div.style.opacity = '0';
        content.removeEventListener('transitionend', hideDiv, false);
      }
    };

    var close = function(event) {

      event.preventDefault();
      event.stopImmediatePropagation();

      var target = event.target;
      var div = document.getElementById('modal__temp');

      /**
       * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
       * inside the modal and have it close.
       */

      if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {

        // make the hidden div visible again and remove the transforms so it scales back to its original size
        div.style.opacity = '1';
        div.removeAttribute('style');

        /**
        * iterate through the modals and modal contents and triggers to remove their active classes.
        * remove the inline css from the trigger to move it back into its original position.
        */

        for (var i = 0; i < len; i++) {
          modals[i].classList.remove('modal--active');
          content[i].classList.remove('modal__content--active');
          trigger[i].style.transform = 'none';
          trigger[i].style.webkitTransform = 'none';
          trigger[i].classList.remove('modal__trigger--active');
        }

        // when the temporary div is opacity:1 again, we want to remove it from the dom
        div.addEventListener('transitionend', removeDiv, false);

        isOpen = false;

      }

      function removeDiv() {
        window.requestAnimationFrame(function() {
          // remove the temp div from the dom with a slight delay so the animation looks good
          div.remove();
        });
      }

    };

    var bindActions = function() {
      for (var i = 0; i < len; i++) {
        trigger[i].addEventListener('click', getId, false);
        closers[i].addEventListener('click', close, false);
        modalsbg[i].addEventListener('click', close, false);
      }
    };

    var init = function() {
      bindActions();
    };

    return {
      init: init
    };

  }());

  Modal.init();

/** Font management **/
$(document).ready(function() {
  if (browserName !== 'Trident' || browserName !== 'IE') {
    var fontPromises = [];

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('/fonts/antique.json', {
      headers: myHeaders,
      cache: 'force-cache',
    }).then(function(data) {
      return data.json();
    }).then(function(data) {
      fontPromises.push(new Promise(function(resolve, reject) {
        // Ptypo.createFont('gnft-thickness', 'antique', data).then(function() {
        //   Ptypo['gnft-thickness'].subset = 'a';
        //   resolve(true);
        // });
        resolve(true);
      }));

      Promise.all(fontPromises).then(function() {
        setTimeout(function () {
          $('#loading').addClass('fade');
            $('body').removeClass('loading');
          setTimeout(function () {
            $('#loading').hide();
          }, 800);
        }, 100);
      });
    });
  } else {
    $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
  }

});
