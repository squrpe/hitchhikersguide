$(document).ready(function(){
   
    var API_KEY = "AIzaSyD3l1Okg79baeg3IRNCc2gnBS7JZuPops0"
    var video = ''
    
    if (localStorage.getItem('inputCountryUser')) {

        var countryPopup = document.getElementById('userCountry');

        countryPopup.classList.remove('hidden');

        userCountry.innerHTML = `
        <p>You're currently in ${localStorage.getItem('inputCountryUser')}</p>
        `;

    }
    

    $("#countryform").submit(function (event) {
        event.preventDefault();

        if (!localStorage.getItem('inputCountryUser'))
            popupCountry();
    
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
            <a class="btn-floating btn-large waves-effect waves-light scroll-btn"><i id="home-btn" class="material-icons">keyboard_arrow_up</i></a>
            `;




            data.items.forEach(item => {
                video = `
                    <iframe class="responsive-iframe" width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
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
                
            <div id="imgdiv">
                <img src="${data[0].flags.svg}" alt="${countryValue} Flag" id="flagimg">
            </div>

                <div  id="countryinfodiv">
                    <h2 id="countryname">${data[0].name.common}</h2>
                    <p id="capital">Capital: ${data[0].capital[0]}</p>
                    <p id="continent">Continent: ${data[0].continents[0]}</p>
                    <p id="population">Population: ${data[0].population}</p>
                    <p id="currency">Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}</p>
                    <p id="languages">Common Languages: ${Object.values(data[0].languages).toString().split(",").join(", ")}</p>
                </div>
                <br>
                    <a class="btn-floating btn-large waves-effect waves-light scroll-btn"><i id="info-btn" class="material-icons">keyboard_arrow_down</i></a>



            `;
            //displays country and video divs after they have rendered the api data
            var div = document.getElementById('countrysection');
            var vid = document.getElementById('videossection');
            div.style.display = 'flex';
            vid.classList.remove("hidden");

            

          
            //submit button scroll
            scroll()
    
            function scroll() {
                $('html, body').animate({
                    scrollTop: $("#countrysection").offset().top
               }, 2000);
               return false;
            }    
            //info page button scroller
            var vidBtn = document.getElementById('info-btn')
            vidBtn.onclick = function vidScroll() {
                
                console.log('info-btn')
                $('html, body').animate({
                    scrollTop: $("#videossection").offset().top
                }, 1000);
                 return false;
                } 
            //home button scroller
                var homeBtn = document.getElementById('home-btn')
                homeBtn.onclick = function homeScroll() {
                    
                    console.log('info-btn')
                    $('html, body').animate({
                        scrollTop: $("#home").offset().top
                    }, 1000);
                     return false;
                    } 
            
        })
        
        
      

    }




    function popupCountry() {

        console.log('test');

        var countryList = [];

        // Get the modal
        var modal = document.getElementById("myModal");

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        var modalBtn = document.getElementById('modalBtn');

        modal.style.display = "block";


        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        modalBtn.onclick = function(event) {

            

            var countryInput = $("#countryInputName").val();
            console.log(countryInput);

            modal.style.display = "none";

            event.preventDefault();

            if (!countryList.includes(countryInput)) {
                countryList.push(countryInput);
                
                localStorage.setItem('inputCountryUser', countryInput);

                var countryPopup = document.getElementById('userCountry');

                countryPopup.classList.remove('hidden');

                userCountry.innerHTML = `
                <p>You're currently in ${countryInput}</p>
                `;
            };

        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
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
