/****** Social Sharing **/
jQuery(document).ready(function($) {
  function getFBShares(page) {
    var shares;
    $.getJSON('http://graph.facebook.com/?ids=' + page, function(data) {
      if (data[page].shares > 1) {
        shares = data[page].shares;
        $('#sharing #facebook .count').html(shares);
      }
    });
  }

  function getTweets(page) {
    var tweets;
    $.getJSON('http://public.newsharecounts.com/count.json?url=' + page + '&callback=?', function(data) {
      if (data.count > 1) {
        tweets = data.count;
        $('#sharing #twitter .count').html(tweets);
      }
    });
  }

  function getLinkedIn(page) {
    var linkedinCount;
    $.getJSON('http://www.linkedin.com/countserv/count/share?url=' + page + '&callback=?', function(data) {
      if (data.count > 1) {
        linkedinCount = data.count;
        $('#sharing #linkedin .count').html(linkedinCount);
      }
    });
  }

  var Url = 'https://prototypo.io';
  var UrlEncoded = encodeURIComponent(Url);
  //var title = encodeURIComponent(document.getElementById('title').innerText);
  getFBShares(Url);
  getTweets(Url);
  getLinkedIn(Url);
  // document.getElementById('fb-share').href='http://www.facebook.com/share.php?u=' + UrlEncoded;
  // document.getElementById('tweet').href='http://twitter.com/home?status=' + title + ' ' + UrlEncoded;
  // document.getElementById('linkedin').href='http://www.linkedin.com/shareArticle?mini=true&url=' + UrlEncoded + '&title=' + title;
  // document.getElementById('gplus-share').href='https://plus.google.com/share?url=' + UrlEncoded;
  // document.getElementById('email-share').href='mailto:?body=Take a look at this page I found: ' + title + '. You can read it here: ' + Url;
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
        $('#thickness').mousemove(function(e) {
          var elemWidth = $(this).outerWidth();
          //var elemHeight = $(this).outerHeight();
          var x = e.pageX - $(this).offset().left;
          //var y = e.pageY - $(this).offset().top;
          var percentX = (x / elemWidth) * 100;
          //var percentY = (y / elemHeight) * 100;
          Ptypo.changeParam(getValue(20, 160, percentX), 'thickness', 'gnft-thickness');
        });
        $('#thickness').mouseleave(function(e) {
          Ptypo.tween(80, 'thickness', 'gnft-thickness', 60, 0.3);
        });
        $('#thickness').mouseenter(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.tween(getValue(20, 160, percentX), 'thickness', 'gnft-thickness', 60, 0);
        });
        resolve(true);
      });
    }));


    fontPromises.push(new Promise(function(resolve, reject) {
      Ptypo.createFont('gnft-width', 'font', data).then(function() {
        Ptypo['gnft-width'].subset = 'n';
        $('#width').mousemove(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.changeParam(getValue(0.4, 5, percentX), 'width', 'gnft-width');
        });
        $('#width').mouseleave(function(e) {
          Ptypo.tween(1, 'width', 'gnft-width', 60, 0.3);
        });
        $('#width').mouseenter(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.tween(getValue(0.4, 5, percentX), 'width', 'gnft-width', 60, 0);
        });
        resolve(true);
      });
    }));


    fontPromises.push(new Promise(function(resolve, reject) {
      Ptypo.createFont('gnft-thickness2', 'font', data).then(function() {
        Ptypo['gnft-thickness2'].subset = 'abceinoprstuvwySP';
        $('#prototypoavailable').mousemove(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.changeParam(getValue(20, 160, percentX), 'thickness', 'gnft-thickness2');
        });
        $('#prototypoavailable').mouseleave(function(e) {
          Ptypo.tween(80, 'thickness', 'gnft-thickness2', 60, 0.3);
        });
        $('#prototypoavailable').mouseenter(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
          var percentX = (x / elemWidth) * 100;
          Ptypo.tween(getValue(20, 160, percentX), 'thickness', 'gnft-thickness2', 60, 0);
        });
        resolve(true);
      });
    }));

    fontPromises.push(new Promise(function(resolve, reject) {
      Ptypo.createFont('gnft-serifs', 'font', data).then(function() {
        Ptypo['gnft-serifs'].subset = 'S';
        $('#serifs').mousemove(function(e) {
          var elemWidth = $(this).outerWidth();
          var elemHeight = $(this).outerHeight();
          var x = e.pageX - $(this).offset().left;
          var y = e.pageY - $(this).offset().top;
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
        });
        $('#serifs').mouseleave(function(e) {
          Ptypo.tween(50, 'serifHeight', 'gnft-serifs', 60, 0.3);
          Ptypo.tween(65, 'serifWidth', 'gnft-serifs', 60, 0.3);
          Ptypo.tween(0, 'serifRotate', 'gnft-serifs', 60, 0.3);
        });

        $('#serifs').mouseenter(function(e) {
          var elemWidth = $(this).outerWidth();
          var elemHeight = $(this).outerHeight();
          var x = e.pageX - $(this).offset().left;
          var y = e.pageY - $(this).offset().top;
          var percentX = (x / elemWidth) * 100;
          var percentY = (y / elemHeight) * 100;

          if (percentY > 50) {
            Ptypo.tween(getValue(0, 1.8, percentX), 'serifRotate', 'gnft-serifs', 60, 0);
          } else {
            Ptypo.tween(getValue(1, 150, percentX), 'serifWidth', 'gnft-serifs', 60, 0);
          }

          Ptypo.tween(getValue(10, 100, percentY), 'serifHeight', 'gnft-serifs', 60, 0);
        });
        resolve(true);
      });
    }));


    var altSet = false;
    fontPromises.push(new Promise(function(resolve, reject) {
      Ptypo.createFont('gnft-alts', 'font', data).then(function() {
        Ptypo['gnft-alts'].subset = '1';
        $('#alts').mousemove(function(e) {
          var elemWidth = $(this).outerWidth();
          var x = e.pageX - $(this).offset().left;
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
        });
        resolve(true);
      });
    }));

    Promise.all(fontPromises).then(function() {
      $('#loading').hide();
      $('body').removeClass('loading');
    });
  });
});
