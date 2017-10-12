function moreInfo(element){
  var id = element.dataset.id
  $.get('/companies/' + id + '.json', function(data){
    var leads= data["leads"]
    var infoList = ""
    for (var i = 0; i < leads.length; i++){
      infoList += "<li>" + leads[i]["name"] + leads[i]["phone_number"] + "</li>"
    }
    console.log(infoList)
    $("#company-" +id).html(infoList)
  })
  // $("#more-" + id + "-company").replaceWith(`<button id="hide-${id}-company" class="js-hide" data-id="${id}" onclick="moreInfo(this)">Hide Info</button>`)
}
