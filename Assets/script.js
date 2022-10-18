$(document).ready(function(){
    var API_KEY = "AIzaSyB4n8ZsQ41g-21s8rjJJDYZFSigRF8Qb4U"
    var video = ''

    $("form").submit(function (event) {
        event.preventDefault()

        var search = $("#search").find(":selected").val()
        console.log(search)
        videoSearch(API_KEY,search,5)
    })
    function videoSearch(key, search,maxResults) {
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


})

