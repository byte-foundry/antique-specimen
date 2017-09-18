/** Social Sharing **/
jQuery(document).ready(function($) {

  var Url = 'https://spectral.prototypo.io';
  var UrlEncoded = encodeURIComponent(Url);
  var titleTwitter = encodeURIComponent('Discover Spectral, the first parametric Google font by @prototypoApp!');
  var titleLinkedin = encodeURIComponent('Discover Spectral, the first parametric Google font by @Prototypo!');
  //getFBShares(Url);
  //getTweets(Url);
  //getLinkedIn(Url);
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
var openedModal;
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
      console.log('Opened modal:'+ modalIdTrimmed);
      if (modalIdTrimmed === 'parameter-frequency' || modalIdTrimmed === 'parameter-name') {
        zone = $(event.target).closest('.interactive').attr('id');
        $zoneElem = $(event.target).closest('.interactive');
        $('#'+modalIdTrimmed+' li').removeClass('active');
        var currentLabel = $zoneElem.find('.'+modalIdTrimmed).text();
        $('#'+modalIdTrimmed+' li[data-value="'+currentLabel+'"]').addClass('active');
        console.log('Zone to change: ' + zone);
      }
      if (openedModal === 'configure') {
        $('#visualizer').appendTo('#visualizer-container');
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
    name: 'Thickness',
    frequency: 'Low',
  },
  prototypo: {
    name: 'Thickness',
    frequency: 'Low',
  },
  contact: {
    name: 'Thickness',
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
      return (freqValue / 220) + 0.5;
      break;
    case 'xHeight':
      return (freqValue * 1.5) + 400;
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

var updateFonts = function(low, med, high){
  if (getRightFreqValue('header', low, med, high) !== 0) {
    Ptypo.changeParam(
      calculateValue(
        getAssociatedParam(choices.header.name),
        getRightFreqValue('header', low, med, high)
      ),
      getAssociatedParam(choices.header.name),
      'antique-header'
    );
  }
  if (getRightFreqValue('presentation', low, med, high) !== 0) {
    Ptypo.changeParam(
      calculateValue(
        getAssociatedParam(choices.presentation.name),
        getRightFreqValue('presentation', low, med, high)
      ),
      getAssociatedParam(choices.presentation.name),
      'antique-presentation'
    );
  }
  if (getRightFreqValue('prototypo', low, med, high) !== 0) {
    Ptypo.changeParam(
      calculateValue(
        getAssociatedParam(choices.prototypo.name),
        getRightFreqValue('prototypo', low, med, high)
      ),
      getAssociatedParam(choices.prototypo.name),
      'antique-prototypo'
    );
  }
  if (getRightFreqValue('contact', low, med, high) !== 0) {
    Ptypo.changeParam(
      calculateValue(
        getAssociatedParam(choices.contact.name),
        getRightFreqValue('contact', low, med, high)
      ),
      getAssociatedParam(choices.contact.name),
      'antique-contact'
    );
  }
  isRaf = false;
};

var resetFont = function(fontName) {
  var params = ['xHeight', 'width', 'thickness'];
  var defaultValues = [600, 1, 54];
  for (var j = 0; j < params.length; j++) {
    Ptypo.changeParam(defaultValues[j], params[j], fontName);
  }
};

var onParameterNameModalClick = function(e) {
  console.log('clicked on name ' + $(e.target).data('value')+ 'on '+zone+ 'block');
  $('#parameter-name li').removeClass('active');
  $(e.target).addClass('active');
  $zoneElem.find('.parameter-name').text($(e.target).data('value'));
  choices[zone].name = $(e.target).data('value');
  resetFont('antique-'+zone);
};

var onParameterFrequencyModalClick = function(e) {
  console.log('clicked on frequency ' + $(e.target).data('value')+ 'on '+zone+ 'block');
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
$configModalButton.on('click', function () {
  var paths = document.getElementsByTagName('path');
  var visualizer = document.getElementById('visualizer');
  var mask = visualizer.getElementById('mask');
  var h = document.getElementById('soundcapturelog');
  var path;
  var report = 0;

  var soundAllowed = function (stream) {
      console.log('Sound allowed');
      isMicOn = true;

      if (!parametersCopied) {
        $interactives.each(function(index, $interactiveDiv) {
          var clonedParameters = $($parameters).clone(true);
          $($interactiveDiv).append(clonedParameters);
        });
        console.log('Copied parameters controls');
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
      visualizer.setAttribute('viewBox', '0 0 255 255');
      for (var i = 0 ; i < 255; i++) {
          path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('stroke-dasharray', '4,1');
          mask.appendChild(path);
      }
      var doDraw = function () {
          if (!isRaf) {
            requestAnimationFrame(doDraw);
          }
          isRaf = true;
          analyser.getByteFrequencyData(frequencyArray);
          var adjustedLength;
          if (soundOn) {

            for (var i = 0 ; i < 255; i++) {
              adjustedLength = Math.floor(frequencyArray[i]) - (Math.floor(frequencyArray[i]) % 5);
              paths[i].setAttribute('d', 'M '+ (i) +',255 l 0,-' + adjustedLength);
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

              updateFonts(adjustedLow, adjustedMed, adjustedHigh);
            }

          }
      }
      doDraw();
      console.log('Started sound analysis');
  }

  var soundNotAllowed = function (error) {
      h.innerHTML = 'No sound detected. Have you allowed your microphone?';
      $(visualizer).hide();
      console.log(error);
  }

  /*window.navigator = window.navigator || {};
  /*navigator.getUserMedia =  navigator.getUserMedia       ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia    ||
                            null;*/
  navigator.getUserMedia({audio:true}, soundAllowed, soundNotAllowed);

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
      }));

      Promise.all(fontPromises).then(function() {
        fontsCreated = true;
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
