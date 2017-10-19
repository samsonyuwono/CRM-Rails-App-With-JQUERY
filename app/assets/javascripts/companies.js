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
    $("#companyShow-" +id).html(infoList)
  })
  $("#more-" + id + "-company").replaceWith(`<button id="hide-${id}-company" class="js-hide" data-id="${id}" onClick= hideInfo(this)> Hide Info</button>`)
}

function hideInfo(element){
  var id = element.dataset.id
  $("#companyShow-"+id).html("")
  $(`#hide-${id}-company`).replaceWith(`<button id="more-${id}-company"
  class="js-more" data-id="${id}" onclick="moreInfo(this)">Show Leads/Contacts</button>`)
}

function nextCompany(){
  // var nextId = parseInt($(".js-next").attr("data-id")) +1
  //get the id on companies index page
  //grab ul and loop thorugh it
  var companyId = []

    $.get('/companies' + '.json', function(data){
      $('.company-list li').attr('data["id"]')
      console.log(data)
      for(var i= 0; i < data.length; i++){
      companyId.push(data["id"])
      }
      console.log(companyId)
  })

  // updateView(nextId)
  }

function previousCompany(){
  var prevId = parseInt($(".js-previous").attr("data-id")) - 1
  updateView(prevId)
}


function updateView(showId){
  $.get('/companies/' + showId + '.json', function(data){
    var revenueNumber = "<b>" + "Revenue (in thousands):" + "</b>" + " " + data["revenue"]
    var customerStatus = "<b>" + "Customer:" + "</b>" + " "+ data["customer"]
    var companyLeads =  "<b>" + data["name"] + "'s" + " " + "Leads/Contacts" + "</b>"

    var leadData= data["leads"]

    var companyLeadInfo = ""
      for (var i = 0; i < leadData.length; i++){
        companyLeadInfo += "<li>" + `<a href=showId/leads/` + leadData[i]["id"] + `>` + leadData[i]["name"] + `</a>` + " " + "|" +
        "<b>" + " Contact?:" + "</b>" + " " + leadData[i]["contact"] +  "</li>"
      }
    $("h3").text(data["name"])
    $("p.revenue").html(revenueNumber)
    $("p.customer").html(customerStatus)
    $("h4").html(companyLeads)
    $("ul.company-info").html(companyLeadInfo)
    $(".js-previous").attr("data-id", data["id"])
    $(".js-next").attr("data-id", data["id"])
    $(".add-lead").html(`<a href="/companies/${data["id"]}/leads/new">Add a lead/contact</a>`)
    $(".edit-link").html(`<a href="/companies/${data["id"]}/leads/data["leads"]["id"]/edit">Edit Company</a>`)
    $(".delete-link").html(`<a href="/companies/${data["id"]}/destroy">Delete Company</a>`)
  })
}
