/** Social Sharing **/
jQuery(document).ready(function($) {

  var Url = 'https://antique-gothic.prototypo.io';
  var UrlEncoded = encodeURIComponent(Url);
  var titleTwitter = encodeURIComponent('Discover Antique Gothic, @prototypoApp latest parametric font!');
  var titleLinkedin = encodeURIComponent('Discover Antique Gothic, @Prototypo latest parametric font!');
  //getFBShares(Url);
  //getTweets(Url);
  //getLinkedIn(Url);
  $('#facebook a').attr('href', 'http://www.facebook.com/share.php?u=' + UrlEncoded);
  $('#twitter a').attr('href', 'http://twitter.com/home?status=' + titleTwitter + ' ' + UrlEncoded);
  $('#googleplus a').attr('href', 'https://plus.google.com/share?url=' + UrlEncoded);
  $('#linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + UrlEncoded + '&title=' + titleLinkedin);

  var navbar = $('nav')
  var resBtn = $('.resbtn');
  var ulList = $('nav ul');
   resBtn.on('click', function () {
       if(ulList.height() == 0) {
           ulList.animate({height: '5.5em'}, 300);
       }else {
           ulList.animate({height: '0em'}, 300);
       }
   });

  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
  };
  var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];
  var konamiCodePosition = 0;
  document.addEventListener('keydown', function(e) {
    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
      konamiCodePosition++;
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  }, {passive: true});
  function activateCheats() {
    $('body').toggleClass('konami');
  }

  // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 50
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 2;
  var navbarHeight = $('nav').outerHeight();

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
          return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
          // Scroll Down
          $('nav').removeClass('nav-down').addClass('nav-up');
      } else {
          // Scroll Up
          if(st + $(window).height() < $(document).height()) {
              $('nav').removeClass('nav-up').addClass('nav-down');
          }
      }

      lastScrollTop = st;
  }

  $('#toast .cta').on('click', function() {
    $('#modal-config').click();
  })

});
/** Utilities **/
function getValue(min, max, percent) {
  return ((percent / 100) * (max - min)) + min;
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/** Browser checking **/
var parser = new UAParser();
// by default it takes ua string from current browser's window.navigator.userAgent
if (parser.getDevice().type) {
  $('#mobileHelper').show();
}

var browserName = parser.getBrowser().name;
var browserOs = parser.getOS().name;
if (browserName === 'Trident' || browserName === 'IE') {
  $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
}

/** Modal management **/
var openedModal;
var isFullScreen = false;
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
      openedModal = modalIdTrimmed;
      if (modalIdTrimmed === 'parameter-frequency' || modalIdTrimmed === 'parameter-name') {
        zone = $(event.target).closest('.interactive').attr('id');
        $zoneElem = $(event.target).closest('.interactive');
        $('#'+modalIdTrimmed+' li').removeClass('active');
        var currentLabel = $zoneElem.find('.'+modalIdTrimmed).text();
        $('#'+modalIdTrimmed+' li[data-value="'+currentLabel+'"]').addClass('active');
      }
      if (openedModal === 'configure') {
        $('#visualizer').appendTo('#visualizer-container');
        $('.microphone-control').remove();
      }
      if (openedModal === 'fullscreen-title') {
        $('#visualizer').prependTo('#fullscreen-title .centered');
        $('.microphone-control').remove();
        isFullScreen = true;
      }
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
        if (openedModal === 'configure') {
          $('#visualizer').prependTo('#navRight');
          $('<span class="microphone-control"></span>').prependTo('#navRight');
          $('.microphone-control').on('click', toggleMicrophone);
        }
        if (openedModal === 'fullscreen-title') {
          $('#visualizer').prependTo('#navRight');
          $('<span class="microphone-control"></span>').prependTo('#navRight');
          $('.microphone-control').on('click', toggleMicrophone);
          isFullScreen = false;
        }
        openedModal = '';

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
        closers[i].addEventListener('click', close, false);
        modalsbg[i].addEventListener('click', close, false);
      }
      for (var i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', getId, false);
      }
    };

    var init = function() {
      trigger = $qsa('.modal__trigger'); // what you click to activate the modal
      bindActions();
    };

    return {
      init: init
    };

  }());

  Modal.init();

/** Parameters management */
var $parameters = $('.parameters')[0];
var parametersCopied = false;
var $interactives = $('.interactive');
var zone;
var $zoneElem;
var soundOn = true;
var choices = {
  header: {
    name: 'Thickness',
    frequency: 'Low',
  },
  presentation: {
    name: 'Width',
    frequency: 'Low',
  },
  prototypo: {
    name: 'Slant',
    frequency: 'Low',
  },
  contact: {
    name: 'X-Height',
    frequency: 'Low',
  }
}

var toggleMicrophone = function() {
  soundOn = !soundOn;
  $('.microphone-control').toggleClass('muted');
  if (!soundOn) {
    var paths = document.getElementsByTagName('path');
    for (var i = 0 ; i < 255; i++) {
      paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + 0);
    }
  }
}

var getAssociatedParam = function(name) {
  switch (name) {
    case 'Thickness':
      return 'thickness';
      break;
    case 'Width':
      return 'width';
      break;
    case 'X-Height':
      return 'xHeight';
    case 'Curviness':
      return 'curviness';
    case 'Slant':
      return 'slant';
      break;
    default:
      break;
  }
}

var calculateValue = function(param, freqValue) {
  switch (param) {
    case 'thickness':
      return freqValue / 3 + 4 ;
      break;
    case 'width':
      return (freqValue / 230) + 0.45;
      break;
    case 'xHeight':
      return (freqValue * 1.5) + 400;
      break;
    case 'curviness':
      return (freqValue / 160);
      break;
    case 'slant':
      return (freqValue / 10) - 3;
      break;
    default:
      break;
  }
}

var getRightFreqValue = function(block, low, med, high) {
  var chosenFreq = choices[block].frequency;
  switch (chosenFreq) {
    case 'Low':
      return low;
      break;
    case 'Medium':
      return med;
      break;
    case 'High':
      return high;
      break;
    default:
      break;
  }
}

var updateFonts = debounce(function(low, med, high){
  $('.interactive')
  .inViewport({ partially: true, tolerance: 0 })                       // jQuery.isInView filter
  .each( function () {
      if (getRightFreqValue([$(this).attr('id')], low, med, high) !== 0) {
        Ptypo.changeParam(
          calculateValue(
            getAssociatedParam(choices[$(this).attr('id')].name),
            getRightFreqValue([$(this).attr('id')], low, med, high)
          ),
          getAssociatedParam(choices[$(this).attr('id')].name),
          'antique-'+$(this).attr('id')
        );
      }
  } );
}, 10);


var updateFullScreenFont = debounce(function(low, med, high){
  Ptypo.changeParam(
    calculateValue(
      'thickness',
      low
    ),
    'thickness',
    'antique-fullscreen'
  );
  Ptypo.changeParam(
    calculateValue(
      'width',
      med
    ),
    'width',
    'antique-fullscreen'
  );
  Ptypo.changeParam(
    calculateValue(
      'slant',
      high
    ),
    'slant',
    'antique-fullscreen'
  );
  }, 10);

var resetFont = function(fontName) {
  var params = ['xHeight', 'width', 'thickness', 'curviness', 'slant'];
  var defaultValues = [600, 1, 54, 0.6, 0];
  for (var j = 0; j < params.length; j++) {
    Ptypo.changeParam(defaultValues[j], params[j], fontName);
  }
};

var onParameterNameModalClick = function(e) {
  $('#parameter-name li').removeClass('active');
  $(e.target).addClass('active');
  $zoneElem.find('.parameter-name').text($(e.target).data('value'));
  choices[zone].name = $(e.target).data('value');
  resetFont('antique-'+zone);
};

var onParameterFrequencyModalClick = function(e) {
  $('#parameter-frequency li').removeClass('active');
  $(e.target).addClass('active');
  $zoneElem.find('.parameter-frequency').text($(e.target).data('value'));
  choices[zone].frequency = $(e.target).data('value');
  resetFont('antique-'+zone);
};
// Modal function binding
$('#parameter-name li').on('click', function(e) {onParameterNameModalClick(e)});
$('#parameter-frequency li').on('click', function(e) {onParameterFrequencyModalClick(e)});

/** Sound capture */
var isMicOn = false;
var isRaf = false;
var $configModalButton = $('#modal-config');
var listening = false;


$configModalButton.on('click', function () {
  var paths = document.getElementsByTagName('path');
  var visualizer = document.getElementById('visualizer');
  var mask = visualizer.getElementById('mask');
  var h = document.getElementById('soundcapturelog');
  var path;
  var report = 0;

  var soundAllowed = function (stream) {
      isMicOn = true;
      $('#fullscreen-trigger').show();

      if (!parametersCopied) {
        $interactives.each(function(index, $interactiveDiv) {
          var clonedParameters = $($parameters).clone(true);
          $($interactiveDiv).append(clonedParameters);
          $($interactiveDiv).find('.parameter-name').text(choices[$($interactiveDiv).attr('id')].name);
        });
        parametersCopied = true;
        Modal.init();
      }

      //Audio stops listening in FF without // window.persistAudioStream = stream;
      //https://bugzilla.mozilla.org/show_bug.cgi?id=965483
      //https://support.mozilla.org/en-US/questions/984179
      window.persistAudioStream = stream;
      $(h).hide();
      var audioContent = new AudioContext();
      var audioStream = audioContent.createMediaStreamSource( stream );
      var analyser = audioContent.createAnalyser();
      audioStream.connect(analyser);
      analyser.fftSize = 1024;

      var frequencyArray = new Uint8Array(analyser.frequencyBinCount);
      visualizer.setAttribute('viewBox', '0 0 255 512');
      for (var i = 0 ; i < 255; i++) {
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('stroke-dasharray', '4,0');
          mask.appendChild(path);
      }
      var lastMedValue = 0;
      var lastLowValue = 0;
      var lastHighValue = 0;
      var noSoundCount = 0;
      var doDraw = function () {
          if (!isRaf) {
            requestAnimationFrame(doDraw);
          }
          isRaf = true;
          listening = true;
          analyser.getByteFrequencyData(frequencyArray);
          var adjustedLength;
          var updateTrigger = 20;
          if (soundOn) {
            for (var i = 0 ; i < 255; i++) {
              adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
              paths[i].setAttribute('d', 'M '+ (i) +',512 l 0,-' + adjustedLength * 2);
            }
            if (fontsCreated) {
              // low
              var total = 0;
              for(var i = 1; i < 10; i++) {
                  total += frequencyArray[i];
              }
              var low = total / 9;
              var adjustedLow = Math.floor(low) - (Math.floor(low) % 5);
              //medium
              total = 0;
              for(var i = 11; i < 21; i++) {
                  total += frequencyArray[i];
              }
              var med = total / 10;
              var adjustedMed = Math.floor(med) - (Math.floor(med) % 5);
              // high
              total = 0;
              for(var i = 30; i < 40; i++) {
                  total += frequencyArray[i];
              }
              var high = total / 10;
              var adjustedHigh = Math.floor(high) - (Math.floor(high) % 5);

              if (Math.abs(lastLowValue - low) > updateTrigger || Math.abs(lastMedValue - med) > updateTrigger || Math.abs(lastHighValue - high) > updateTrigger) {
                if (isFullScreen) {
                  updateFullScreenFont(adjustedLow, adjustedMed, adjustedHigh);
                }
                else updateFonts(adjustedLow, adjustedMed, adjustedHigh);
                isRaf = false;
              } else {
                isRaf = false;
              }

              if (low === 0 && med === 0 && high === 0) {
                noSoundCount ++;
              } else {
                if (noSoundCount >= 190) {
                  $(h).hide();
                  $(visualizer).show();
                  $('#fullscreen-trigger').show();
                }
                noSoundCount = 0;
              }
              if (noSoundCount === 200) {
                $(h).show();
                h.innerHTML = 'No sound detected. Please check your microphone';
                $(visualizer).hide();
                $('#fullscreen-trigger').hide();
              }
            }

          } else isRaf = false;
      }
      doDraw();
  }

  var soundNotAllowed = function (error) {
      $('#fullscreen-trigger').hide();
      $(h).show();
      if(error === 'nocompat') {
        h.innerHTML = 'We\'re sorry, our browser does not support microphone capture.';
      } else h.innerHTML = 'No sound detected. Have you allowed your microphone?';
      $(visualizer).hide();
      console.log(error);
  }


  if(navigator.getUserMedia) {
    window.navigator = window.navigator || {};
    navigator.getUserMedia =  navigator.getUserMedia       ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia    ||
                              null;
    navigator.getUserMedia({audio:true}, !listening ? soundAllowed : function(){}, soundNotAllowed);
  } else soundNotAllowed('nocompat');


});

/** Font management **/

var fontsCreated = false;
$(document).ready(function() {
  if (browserName !== 'Trident' || browserName !== 'IE') {
    var fontPromises = [];

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch('/fonts/font.json', {
      headers: myHeaders,
      cache: 'force-cache',
    }).then(function(data) {
      return data.json();
    }).then(function(data) {
      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('antique-header', 'font', data).then(function() {
          //Ptypo['gnft-thickness'].subset = 'a';
          resolve(true);
        });
        Ptypo.createFont('antique-presentation', 'font', data).then(function() {
          //Ptypo['gnft-thickness'].subset = 'a';
          resolve(true);
        });
        Ptypo.createFont('antique-prototypo', 'font', data).then(function() {
          //Ptypo['gnft-thickness'].subset = 'a';
          resolve(true);
        });
        Ptypo.createFont('antique-contact', 'font', data).then(function() {
          //Ptypo['gnft-thickness'].subset = 'a';
          resolve(true);
        });
        Ptypo.createFont('antique-fullscreen', 'font', data).then(function() {
          Ptypo['antique-fullscreen'].subset = 'Antique Gothic';
          resolve(true);
        });
      }));

      Promise.all(fontPromises).then(function() {
        fontsCreated = true;
        setTimeout(function () {
          $('#loading').addClass('fade');
            $('body').removeClass('loading');
          setTimeout(function () {
            $('#loading').hide();
            setTimeout(function () {
              if (!listening) {
                var x = document.getElementById('toast')
                x.className = 'show';
                setTimeout(function(){ x.className = x.className.replace('show', ''); }, 5000);
              }
            }, 10000);
          }, 800);
        }, 100);
      });
    });
  } else {
    $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
  }

});
