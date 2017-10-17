function moreInfo(element){
  var id = element.dataset.id
  $.get('/companies/' + id + '.json', function(data){
    var leads= data["leads"]
    var infoList = ""
    for (var i = 0; i < leads.length; i++){
      infoList += "<li>" + "<b>" + "Name:" + "</b>" + " " + leads[i]["name"] + " " + "|" +
      "<b>" + " Phone Number:" + "</b>" + " " + leads[i]["phone_number"] + " " + "|" +
      "<b>" + " Email:" + "</b>" + " " + leads[i]["email"] + " " + "|" +
      "<b>" + " Contact?" + "</b>" + leads[i]["contact"] + "</li>"


    }
    $("#company-" +id).html(infoList)
  })
  $("#more-" + id + "-company").replaceWith(`<button id="hide-${id}-company" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Info</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  $("#company-"+id).html("")
  $(`#hide-${id}-company`).replaceWith(`<button id="more-${id}-company" class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Cities</button>`)
}

function nextCompany(){
  var nextId = parseInt($(".js-next").attr("data-id")) + 1
  console.log(nextId)
  updateView(nextId)
  }

function updateView(showId){
  $.get('/companies/' + showId + '.json', function(data){
    console.log(data)
      //
      // fetch(`https://localhost:3000/companies/${showId}`)
      //   .then(function(res){
      //     console.log(res)
      // return res.json()
      //   })
      //fetch then render page
  })
}
