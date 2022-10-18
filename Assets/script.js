$(document).ready(function(){

    var countryInputEl = $('#search');
    var searchBtn = $('#searchbtn');

    var API_KEY = "AIzaSyB4n8ZsQ41g-21s8rjJJDYZFSigRF8Qb4U"
    var video = ''

    $("form").submit(function (event) {
        event.preventDefault()

        var search = $("#search").find(":selected").val();
        console.log(search)

        var countryValue = $('#search').find(":selected").data('country');

        // var search = $("#search").find(":selected");
        // console.log(search)

        // var countryValue = $(this).find(":selected");

        console.log(countryValue);

        countrySearch(countryValue)
        videoSearch(API_KEY,search,5)
        
    })

    function videoSearch(key, search,maxResults) {

        //search + " tourism"

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){
            console.log(data)
            data.items.forEach(item => {
                video = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                
                `
                $("#videos").append(video)
            });
        })
    }

    function countrySearch(countryValue) {

        console.log('test');

        var countryURL = `https://restcountries.com/v3.1/name/${countryValue}?fullText=true`;
        console.log(countryURL);

    }
    


})
