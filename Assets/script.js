$(document).ready(function(){

    var API_KEY = "AIzaSyB4n8ZsQ41g-21s8rjJJDYZFSigRF8Qb4U"
    var video = ''

    $("form").submit(function (event) {
        event.preventDefault()

        var search = $("#search").find(":selected").val();
        console.log(search)
        var countryValue = $('#search').find(":selected").data('country');
        console.log(countryValue);

        countrySearch(countryValue)
        videoSearch(API_KEY,search,6,countryValue)
        
    })



    function videoSearch(key, search, maxResults, countryValue) {
        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&type=video&part=snippet&maxResults=" + maxResults + "&q=" + search,function(data){
            console.log(data)

            videossection.innerHTML = `
            <h2>Recommended Youtube Videos for ${countryValue} Tourism:</h2>
            `;

            data.items.forEach(item => {
                video = `
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                $("#videossection").append(video)
            });
        })
    }



    function countrySearch(countryValue) {

        var countryURL = `https://restcountries.com/v3.1/name/${countryValue}?fullText=true`;
        console.log(countryURL);

        fetch(countryURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);

            countrysection.innerHTML = `
                
                <div id="countryinfodiv">
                    <h2 id="countryname">${data[0].name.common}</h2>
                    <p id="capital">Capital: ${data[0].capital[0]}</p>
                    <p id="continent">Continent: ${data[0].continents[0]}</p>
                    <p id="population">Population: ${data[0].population}</p>
                    <p id="currency">Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</p>
                    <p id="languages">Common Languages: ${Object.values(data[0].languages).toString().split(",").join(", ")}</p>
                </div>

                <div id="imgdiv">
                    <img src="${data[0].flags.svg}" alt="${countryValue} Flag" id="flagimg">
                </div>

            `;

        })
    
    }
})










// // function to store locally
// var searchHistoryList = [];
// $("#searchbtn").on("click", function(event) {
//     event.preventDefault();

//     var input = $("#search").val(); 
//     if (!searchHistoryList.includes(input)) {
//         searchHistoryList.push(input);
//         var searchedCountry = $(`
//             <li class="list-group-item">${input}</li>
//             `);
//         $("#searchHistory").append(searchedCountry);
//     };
    
//     localStorage.setItem("city", JSON.stringify(searchHistoryList));
//     console.log(searchHistoryList);
// });

// $(document).on("click", ".list-group-item", function() {
//     var listCity = $(this).text();
//     countrySearch(listCity);
//     videoSearch(listCity);
// });

