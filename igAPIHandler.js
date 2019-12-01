function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4){
            if (xmlHttp.status == 200){
                callback(xmlHttp.responseText);
            } else {
                callback(null);
            }
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getIgUserInfo(username, callback){
    function profileLoadedCallback(data){
        if (!data){
            callback(null);
        }

        data = JSON.parse(data.split("window._sharedData = ")[1].split(";</script>")[0]).entry_data.ProfilePage[0].graphql;
        if (callback){
            callback(data.user);
        }
    }

    httpGetAsync("https://www.instagram.com/" + username, profileLoadedCallback);
}

function getIgUserContent(metaInfo, callback){
    function contentLoadedCallback(data){
        if (!data){
            callback(null);
        }

        if (callback){
            callback(JSON.parse(data), userID);
        }
    }

    var userID = metaInfo.igUserID;
    var afterCursor = metaInfo.end_cursor ? ('"' + metaInfo.end_cursor + '"') : "null";

    var url = 'https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"'+userID+'","first":9,"after":'+afterCursor+'}'

    httpGetAsync(url, contentLoadedCallback);
}



function formatNumberToAverage(x) {
    if(isNaN(x)) return x.toString();

    if(x < 9999) {
        return x.toString();
    }

    if(x < 1000000) {
        return Math.round(x/1000) + "K";
    }
    if( x < 10000000) {
        return (x/1000000).toFixed(2) + "M";
    }

    if(x < 1000000000) {
        return Math.round((x/1000000)) + "M";
    }

    if(x < 1000000000000) {
        return Math.round((x/1000000000)) + "B";
    }

    return "1T+";
}