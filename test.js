var ratings = [
    {
        "Source": "Internet Movie Database",
        "Value": "8.3/10"
    },
    {
        "Source": "Rotten Tomatoes",
        "Value": "81%"
    },
    {
        "Source": "Metacritic",
        "Value": "65/100"
    }
]

//console.log((ratings[1])["Source"])

// for (var a = 0; a < ratings.length; a++){
//     if ( (ratings[a])["Source"] == "Rotten Tomatoes")
//     {
//         console.log((ratings[a])["Value"])
//     }
// }

var rottenValue = ratings.find(function(element) {
    
        if ( (element)["Source"] == "Rotten Tomatoes")
        {
            console.log ((element)["Value"])
        }
    
});