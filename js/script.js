
function loadData(e) {
    //prevent default page refresh
    e.preventDefault();

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
                    + address + '';

    $body.append('<img id="bgimg" src="'+ streetView + '">');


    // NYT relevant stories AJAX request
    var nytUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + streetStr +
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

    return false;
}


$('#form-container').submit(loadData);
