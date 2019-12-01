window.onload = function() {
    let closeButton = document.querySelector('.close-button');
    if (closeButton){
        closeButton.addEventListener('click', () => {
            miro.board.ui.closeModal();
        })
    }

    let data =JSON.parse(localStorage.getItem('currentIgPostData'));
    document.getElementById("dateValue").innerHTML = timeConverter(data.time);
    document.getElementById("commentValue").innerHTML = data.comment;
}

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}