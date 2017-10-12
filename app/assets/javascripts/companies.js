function moreInfo(element){
  var id = element.dataset.id
  $.get('/companies/' + id + '.json', function(data){
    var leads= data["leads"]
    var infoList = ""
    for (var i = 0; i < leads.length; i++){
      infoList += "<li>" + "Name:" + " " + leads[i]["name"] + "</li>"
      // "Email:" + " " + leads[i]["email"] + " " +
      // "Phone Number:" + " " + leads[i]["phone_number"] + " " +
      // "Contact?" + leads[i]["contact"] + "</li>"
    }
    console.log(infoList)
    $("#company-" +id).html(infoList)
  })
  $("#more-" + id + "-company").replaceWith(`<button id="hide-${id}-company" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Info</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  console.log(id)
  $("#company-"+id).html("")
  $(`#hide-${id}-company`).replaceWith(`<button id="more-${id}-company" class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Cities</button>`)
}
