
function loadData(e) {
    //prevent default page refresh
    e.preventDefault();

    // Select an div ID on the page and assign it to a variable
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Google streetview Image request from search
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So you wanna live at ' + address + '?');

    var streetView = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='
                    + address + '&key=AIzaSyD2tKBjRkdAtSJthU2Wm135MmtptdoQxm8';

    $body.append('<img id="bgimg" src="'+ streetView + '">');


    // NYT relevant stories AJAX request
    var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + address +
                    '&sort=newest&api-key=b8eac2475f894084acd924d4d1887fbd';

    $.getJSON(nytUrl, function(data) {

       $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        console.log(articles);
        for(var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href ="'+ article.web_url +'">'+ article.headline.main + '</a>'
                + '<p>' + article.snippet + '</p>' +
                '</li>');
        }
    }).fail(function(e) {
        $nytHeaderElem.text('Sorry the New York Times Could not Load');
    });

    // Wikipedia AJAX Request
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+ cityStr +'&format=json';
    var wikiFail = setTimeout(function(){
                    $wikiElem.text("Failed to get Wikipedia Resources");
                    }, 8000);

    $.ajax({
        url : wikiUrl,
        dataType : "jsonp"
    }).done(function (response) {
        var articleList = response[1];

        for (var i = 0 ; i < articleList.length; i++) {
            articleStr = articleList[i];
            var url = "http://en.wikipedia.org/wiki/" + articleStr;
            $wikiElem.append('<li><a href="' + url + '">' + articleStr + "</a>" + '</li>');
        }

        clearTimeout(wikiFail);

    });



    return false;
}

//When someone clicks submit on our form-container div run the loadData function
$('#form-container').submit(loadData);
