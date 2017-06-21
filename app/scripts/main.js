/****** Social Sharing **/
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
  var title = encodeURIComponent('Discover Spectral, the first parametric Google font by Prototypo!');
  getFBShares(Url);
  getTweets(Url);
  getLinkedIn(Url);
  $('#facebook a').attr('href', 'http://www.facebook.com/share.php?u=' + UrlEncoded);
  $('#twitter a').attr('href', 'http://twitter.com/home?status=' + title + ' ' + UrlEncoded);
  $('#googleplus a').attr('href', 'https://plus.google.com/share?url=' + UrlEncoded);
  $('#linkedin a').attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + UrlEncoded + '&title=' + title);
});


function getValue(min, max, percent) {
  return ((percent / 100) * (max - min)) + min;
}

var parser = new UAParser();
// by default it takes ua string from current browser's window.navigator.userAgent
if (parser.getDevice().type) {
  $('#mobileHelper').show();
}

var browserName = parser.getBrowser().name;
if (browserName === 'Trident' || browserName === 'IE') {
  $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
}
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
        Ptypo.createFont('gnft-thickness', 'font', data).then(function() {
          Ptypo['gnft-thickness'].subset = 'a';
          var onMouseMove = function(e) {
            var elemWidth = $('#thickness').outerWidth();
            //var elemHeight = $('#thickness').outerHeight();
            var x = (e.pageX || e.center.x) - $('#thickness').offset().left;
            //var y = e.pageY - $(this).offset().top;
            var percentX = (x / elemWidth) * 100;
            //var percentY = (y / elemHeight) * 100;
            Ptypo.changeParam(getValue(40, 130, percentX), 'thickness', 'gnft-thickness');
          }
          var hammertime = new Hammer($('#thickness').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#thickness').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#thickness').mouseleave(function(e) {
            Ptypo.tween(80, 'thickness', 'gnft-thickness', 60, 0.3);
          });
          $('#thickness').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-width', 'font', data).then(function() {
          Ptypo['gnft-width'].subset = 'n';
          var onMouseMove = function(e) {
            var elemWidth = $('#width').outerWidth();
            var x = (e.pageX || e.center.x) - $('#width').offset().left;
            var percentX = (x / elemWidth) * 100;
            Ptypo.changeParam(getValue(0.4, 5, percentX), 'width', 'gnft-width');
          }
          var hammertime = new Hammer($('#width').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#width').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#width').mouseleave(function(e) {
            Ptypo.tween(1, 'width', 'gnft-width', 60, 0.3);
          });
          $('#width').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-thickness2', 'font', data).then(function() {
          Ptypo.changeParam(30, 'thickness', 'gnft-thickness2');
          Ptypo['gnft-thickness2'].subset = 'Discover Spectral, the first parametric Google font by Prototypo!';
          var onMouseMove = function(e) {
            var elemWidth = $('#prototypoavailable').outerWidth();
            var x = (e.pageX || e.center.x) - $('#prototypoavailable').offset().left;
            var percentX = (x / elemWidth) * 100;
            Ptypo.changeParam(getValue(20, 50, percentX), 'thickness', 'gnft-thickness2');
          }
          var hammertime = new Hammer($('#prototypoavailable').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#prototypoavailable').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#prototypoavailable').mouseleave(function(e) {
            Ptypo.tween(30, 'thickness', 'gnft-thickness2', 60, 0.3);
          });
          $('#prototypoavailable').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-aperture', 'font', data).then(function() {
          Ptypo['gnft-aperture'].subset = 'Spectrals';
          var onMouseMove = function(e) {
            var elemWidth = $('#aperture').outerWidth();
            var x = (e.pageX || e.center.x) - $('#aperture').offset().left;
            var percentX = (x / elemWidth) * 100;
            Ptypo.changeParam(getValue(0.4, 1.6, percentX), 'aperture', 'gnft-aperture');
          }
          var hammertime = new Hammer($('#aperture').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#aperture').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#aperture').mouseleave(function(e) {
            Ptypo.tween(1, 'aperture', 'gnft-aperture', 60, 0.3);
          });
          $('#aperture').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));

      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-serifs', 'font', data).then(function() {
          Ptypo['gnft-serifs'].subset = 'S';

          var onMouseMove = function(e, isTouch) {
            var elemWidth = $('#serifs').outerWidth();
            var elemHeight = $('#serifs').outerHeight();
            var x = (e.pageX || e.center.x) - $('#serifs').offset().left;
            var y = (e.pageY || e.center.y) - $('#serifs').offset().top;
            var percentX = (x / elemWidth) * 100;
            var percentY = (y / elemHeight) * 100;

            if (percentY > 50) {
              Ptypo.changeParam(getValue(-2, 0.8, percentX), 'serifRotate', 'gnft-serifs');
              if (Ptypo.getParam('serifWidth', 'gnft-serifs') !== 65) {
                Ptypo.tween(65, 'serifWidth', 'gnft-serifs', 60, 0);
              }
            } else {
              Ptypo.changeParam(getValue(1, 50, percentX), 'serifWidth', 'gnft-serifs');
              if (Ptypo.getParam('serifRotate', 'gnft-serifs') !== 0) {
                Ptypo.tween(0, 'serifRotate', 'gnft-serifs', 60, 0);
              }
            }
            if (!isTouch) {
              Ptypo.changeParam(getValue(40, 100, percentY), 'serifHeight', 'gnft-serifs');
            }
          }

          var hammertime = new Hammer($('#serifs').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e, true);
          });


          $('#serifs').mousemove(function(e) {
            onMouseMove(e);
          });


          $('#serifs').mouseleave(function(e) {
            Ptypo.tween(50, 'serifHeight', 'gnft-serifs', 60, 0.3);
            Ptypo.tween(65, 'serifWidth', 'gnft-serifs', 60, 0.3);

            Ptypo.tween(0, 'serifRotate', 'gnft-serifs', 60, 0.3);
          });

          $('#serifs').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-contrast', 'font', data).then(function() {
          Ptypo.changeParam(100, 'thickness', 'gnft-contrast');
          Ptypo.changeParam(-1, '_contrast', 'gnft-contrast');
          Ptypo['gnft-contrast'].subset = 'ec';
          var onMouseMove = function(e) {
            var elemWidth = $('#contrast').outerWidth();
            var x = (e.pageX || e.center.x) - $('#contrast').offset().left;
            var percentX = (x / elemWidth) * 100;
            Ptypo.changeParam(getValue(-1.5, -0.15, percentX), '_contrast', 'gnft-contrast');
          }
          var hammertime = new Hammer($('#contrast').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#contrast').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#contrast').mouseleave(function(e) {
            Ptypo.tween(-1, '_contrast', 'gnft-contrast', 60, 0.3);
          });
          $('#contrast').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));

      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-bracketcurve', 'font', data).then(function() {
          Ptypo['gnft-bracketcurve'].subset = 'xyz';
          var onMouseMove = function(e, isTouch) {
            var elemWidth = $('#bracketcurve').outerWidth();
            var elemHeight = $('#bracketcurve').outerHeight();
            var x = (e.pageX || e.center.x) - $('#bracketcurve').offset().left;
            var y = (e.pageY || e.center.y) - $('#bracketcurve').offset().top;
            var percentX = (x / elemWidth) * 100;
            var percentY = (y / elemHeight) * 100;
            Ptypo.changeParam(getValue(5, 100, percentX), 'serifCurve', 'gnft-bracketcurve');
            if (!isTouch) {
              Ptypo.changeParam(getValue(0, 100, percentY), 'serifHeight', 'gnft-bracketcurve');
            }
          }

          var hammertime = new Hammer($('#bracketcurve').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e, true);
          });


          $('#bracketcurve').mousemove(function(e) {
            onMouseMove(e);
          });


          $('#bracketcurve').mouseleave(function(e) {
            Ptypo.tween(50, 'serifHeight', 'gnft-bracketcurve', 60, 0.3);
            Ptypo.tween(50, 'serifCurve', 'gnft-bracketcurve', 60, 0.3);
          });

          $('#bracketcurve').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-curviness', 'font', data).then(function() {
          Ptypo['gnft-curviness'].subset = 'Oo';
          var onMouseMove = function(e) {
            var elemWidth = $('#curviness').outerWidth();
            var x = (e.pageX || e.center.x) - $('#curviness').offset().left;
            var percentX = (x / elemWidth) * 100;
            Ptypo.changeParam(getValue(0.45, 0.8, percentX), 'curviness', 'gnft-curviness');
          }
          var hammertime = new Hammer($('#curviness').get(0));
          hammertime.on('pan', function(e) {
            onMouseMove(e);
          });
          $('#curviness').mousemove(function(e) {
            onMouseMove(e);
          });
          $('#curviness').mouseleave(function(e) {
            Ptypo.tween(0.60, 'curviness', 'gnft-curviness', 60, 0.3);
          });
          $('#curviness').mouseenter(function(e) {
            onMouseMove(e);
          });
          resolve(true);
        });
      }));


      var techThickness = ['70', '75', '80', '85', '90', '95', '100', '105', '110'];
      var index = 0;

      function getNextIndex(index) {
        return techThickness[index % 9];
      };


      function createTechInterval(duration){
        return setInterval(function() {
          $('#technology .paragraph-1').attr('class', 'paragraph-1');
          $('#technology .paragraph-1').addClass('gfnt-' + getNextIndex(index));
          $('#technology .paragraph-2').attr('class', 'paragraph-2');
          $('#technology .paragraph-2').addClass('gfnt-' + getNextIndex(index + 1));
          $('#technology .paragraph-3').attr('class', 'paragraph-3');
          $('#technology .paragraph-3').addClass('gfnt-' + getNextIndex(index + 2));
          $('#technology .paragraph-4').attr('class', 'paragraph-4');
          $('#technology .paragraph-4').addClass('gfnt-' + getNextIndex(index + 3));
          $('#technology .paragraph-5').attr('class', 'paragraph-5');
          $('#technology .paragraph-5').addClass('gfnt-' + getNextIndex(index + 4));
          $('#technology .paragraph-6').attr('class', 'paragraph-6');
          $('#technology .paragraph-6').addClass('gfnt-' + getNextIndex(index + 5));
          index++;
          if (index > techThickness.length - 1) {
            index = 0;
          }
        }, duration);
      }

      var techInterval = createTechInterval(3000);

      $('#technology').mouseleave(function(e) {
        clearInterval(techInterval);
        techInterval = createTechInterval(3000);
      });
      $('#technology').mouseenter(function(e) {
        clearInterval(techInterval);
        techInterval = createTechInterval(100);
      });



      var altSet = false;
      fontPromises.push(new Promise(function(resolve, reject) {
        Ptypo.createFont('gnft-alts', 'font', data).then(function() {
          var onMouseMove = function(e) {
            var elemWidth = $('#alts').outerWidth();
            var x = e.pageX - $('#alts').offset().left;
            var percentX = (x / elemWidth) * 100;

            if (percentX > 50 && !altSet) {
              Ptypo.changeParam({
                '49': 'one_alt'
              }, 'altList', 'gnft-alts');
              altSet = true;
            }
            if (percentX <= 50 && altSet) {
              Ptypo.changeParam({
                '49': 'one'
              }, 'altList', 'gnft-alts');
              altSet = false;
            }
          }
          $('#alts').mousemove(function(e) {
            onMouseMove(e);
          });
          Ptypo['gnft-alts'].subset = '1';
          resolve(true);
        });
      }));

      Promise.all(fontPromises).then(function() {
        $('#loading').hide();
        $('body').removeClass('loading');
      });
    });
  } else {
    $('#loading .small').html('Unfortunately, we are not supporting your browser at this time. We are aware of the issue and we are working to fix this. Meanwhile, please visit this site using Google Chrome, Opera or Firefox to get the full interactive experience');
  }


});
