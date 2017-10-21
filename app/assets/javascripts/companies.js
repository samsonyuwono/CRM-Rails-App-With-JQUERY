$(document).ready(function(){
  attachListeners()
})


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
  var nextId = parseInt($(".js-next").attr("data-id"))
  $.ajax({
    type: "get",
    url: `/companies/${nextId}/next`
  }).done(function(company) {
    var newCompany = new Company(company.name, company.revenue, company.customer, company.user_id, company.leads)
    console.log(company)
    newCompany.updateView()
  })
}

function previousCompany(){
  var prevId = parseInt($(".js-previous").attr("data-id")) - 1
  updateView(prevId)
}

let companyId = 0
function Company(name, revenue, customer, company_id, leads) {
  this.name = name
  this.revenue = revenue
  this.customer = customer
  this.company_id = companyId++
  this.leads = leads
}


Company.prototype.updateView = function(){

    var revenueNumber = `<b> Revenue (in thousands): </b> ${this.revenue}`
    var customerStatus = `<b> Customer: </b> ${this.customer}`
    var companyLeads =  `<b> ${this.name}'s Leads/Contacts </b>`

    var leadData= this.leads

    var companyLeadInfo = ""
      for (var i = 0; i < this.leads.length; i++){
        companyLeadInfo += "<li>" + `<a href=showId/leads/` + this.leads[i].id + `>` + this.leads[i].name + `</a>` + " " + "|" +
        "<b>" + " Contact?:" + "</b>" + " " + this.leads[i].contact +  "</li>"
      }
    $("h3").text(this.name)
    $("p.revenue").html(revenueNumber)
    $("p.customer").html(customerStatus)
    $("h4").html(companyLeads)
    $("ul.company-info").html(companyLeadInfo)
    $(".js-next").attr("data-id", this.company_id)
    $(".add-lead").html(`<a href="/companies/${this.company_id}/leads/new">Add a lead/contact</a>`)
    $(".edit-link").html(`<a href="/companies/${this.company_id}/edit">Edit Company</a>`)
    $(".delete-link").html(`<a href="/companies/${this.company_id}/destroy">Delete Company</a>`)
}

function attachListeners(){
      $(".js-next").click(nextCompany)

      $('form').submit(function(event){
      event.preventDefault()
      createNewComment(this)
    })
}



function createNewComment(element){
  var values= $(element).serialize()
  var posting = $.post('/comments', values)
  console.log(posting)

  // posting.done(function(data){
  //   // var comment = data["text"]
  posting.done(function(data) {
        var comment = data;
        $("#comment").text(comment["text"]);
        console.log(comment)
        console.log(comment["company"]["user_id"])
      });

}


function Comment(text, user_id, company_id){
  this.text = text
  this.user_id = user_id
  this.company = company_id

}
