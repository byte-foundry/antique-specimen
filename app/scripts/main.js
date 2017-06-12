/****** Social Sharing **/
jQuery(document).ready(function($) {
  function getFBShares(page) {
    var shares;
    $.getJSON('http://graph.facebook.com/?ids=' + page, function(data) {
      if (data[page].share) {
        shares = data[page].share.share_count;
        $('#sharing #facebook .count').html(shares);
      }
    });
  }

  function getTweets(page) {
    var tweets;
    $.getJSON('http://public.newsharecounts.com/count.json?url=' + page + '&callback=?', function(data) {
      if (data) {
        tweets = data.count;
        $('#sharing #twitter .count').html(tweets || '0');
      }
    });
  }

  function getLinkedIn(page) {
    var linkedinCount;
    $.getJSON('http://www.linkedin.com/countserv/count/share?url=' + page + '&callback=?', function(data) {
      if (data.count) {
        linkedinCount = data.count;
        $('#sharing #linkedin .count').html(linkedinCount);
      }
    });
  }

  var Url = 'https://prototypo.io';
  var UrlEncoded = encodeURIComponent(Url);
  var title = encodeURIComponent('Spectral specimen');
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

$(document).ready(function() {

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
          Ptypo.changeParam(getValue(20, 160, percentX), 'thickness', 'gnft-thickness');
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
        Ptypo['gnft-thickness2'].subset = 'abceinoprstuvwySP';
        var onMouseMove = function(e) {
          var elemWidth = $('#prototypoavailable').outerWidth();
          var x = (e.pageX || e.center.x) - $('#prototypoavailable').offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.changeParam(getValue(20, 160, percentX), 'thickness', 'gnft-thickness2');
        }
        var hammertime = new Hammer($('#prototypoavailable').get(0));
        hammertime.on('pan', function(e) {
        	onMouseMove(e);
        });
        $('#prototypoavailable').mousemove(function(e) {
          onMouseMove(e);
        });
        $('#prototypoavailable').mouseleave(function(e) {
          Ptypo.tween(80, 'thickness', 'gnft-thickness2', 60, 0.3);
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
          Ptypo.changeParam(getValue(0.2, 2, percentX), 'aperture', 'gnft-aperture');
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

        var onMouseMove = function(e) {
          var elemWidth = $('#serifs').outerWidth();
          var elemHeight = $('#serifs').outerHeight();
          var x = (e.pageX || e.center.x) - $('#serifs').offset().left;
          var y = (e.pageY || e.center.y) - $('#serifs').offset().top;
          var percentX = (x / elemWidth) * 100;
          var percentY = (y / elemHeight) * 100;

          if (percentY > 50) {
            Ptypo.changeParam(getValue(0, 1.8, percentX), 'serifRotate', 'gnft-serifs');
            if (Ptypo.getParam('serifWidth', 'gnft-serifs') !== 65) {
              Ptypo.tween(65, 'serifWidth', 'gnft-serifs', 60, 0);
            }
          } else {
            Ptypo.changeParam(getValue(1, 150, percentX), 'serifWidth', 'gnft-serifs');
            if (Ptypo.getParam('serifRotate', 'gnft-serifs') !== 0) {
              Ptypo.tween(0, 'serifRotate', 'gnft-serifs', 60, 0);
            }
          }
          Ptypo.changeParam(getValue(10, 100, percentY), 'serifHeight', 'gnft-serifs');
        }

        var hammertime = new Hammer($('#serifs').get(0));
        hammertime.on('pan', function(e) {
        	onMouseMove(e);
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
});
