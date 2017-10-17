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
  $(`#hide-${id}-company`).replaceWith(`<button id="more-${id}-company"
  class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Cities</button>`)
}

function nextCompany(){
  var nextId = parseInt($(".js-next").attr("data-id")) + 1
  updateView(nextId)
  }

function updateView(showId){
  $.get('/companies/' + showId + '.json', function(data){
    console.log(data["customer"])
    var revenueNumber = "<b>" + "Revenue (in thousands):" + "</b>" + " " + data["revenue"]
    var customerStatus = "<b>" + "Customer:" + "</b>" + " "+ data["customer"]
    $("h3").text(data["name"])
    $("p.revenue").html(revenueNumber)
    $("p.customer").html(customerStatus)
    $(".js-next").attr("data-id", data["id"])
    $(".add-lead").html(`<a href="/companies/${data["id"]}/leads/new">Add a lead/contact</a>`)
    $(".edit-link").html(`<a href="/companies/${data["id"]}/edit">Edit Company</a>`)
    $(".delete-link").html(`<a href="/companies/${data["id"]}/destroy">Delete Company</a>`)//has to render delete action
  })
}
