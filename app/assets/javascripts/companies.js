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

    var commentData = this.comments

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
    $("#comments").html(this.comments)

}

function formatLeadList(){
      var companyLeadInfo = ""
        for (var i = 0; i < this.leads.length; i++){
          companyLeadInfo += "<li>" + `<a href=showId/leads/` + this.leads[i].id + `>` + this.leads[i].name + `</a>` + " " + "|" +
          "<b>" + " Contact?:" + "</b>" + " " + this.leads[i].contact +  "</li>"
        }
}

function attachListeners(){
      $(".js-next").click(nextCompany)

      $('form').submit(function(event){
      event.preventDefault()
      createNewComment(this)
      console.log(this)
    })

    $(".delete-comment").click(function(event){
      event.preventDefault()
      deleteComment(this)
    })
}


function formatCommentList(comments){
  let commentText = ""
  for (var i = 0; i < comments.length; i++) {
    let com = new Comment(comments[i]["id"],comments[i]["text"],comments[i]["user"],comments[i]["company"]["name"])

    console.log(comments[i]["user"]["id"])
    if (comments[i]["user"]["id"] === parseInt($("#comment_user_id").attr("value"))){
      commentText += com.formatComment() + " <button class='delete-comment' data='" + com.id + "' onclick='deleteComment(this)'>Delete</button></li>"
    } else {
       commentText += com.formatComment() + "</li>"
    }
  }
  return commentText
}


function deleteComment(element){
  var commentId = element.attributes["data"].value
  $.ajax({
    url: '/comments/' +commentId,
    type: 'DELETE',
    success: function(result){
      $("#comment-"+result["id"]).replaceWith("")
    }
  })
}

function createNewComment(element){
  var values= $(element).serialize()
  var posting = $.post('/comments', values)

  posting.done(function(comment) {

        var newComment = new Comment(comment.id, comment.text, comment.user, comment.company)

        var createdComment = newComment.formatComment() + " <button class='delete-comment' data='" + comment.id + "' onclick='deleteComment(this)'>Delete</button></li>"
        $("#comments").append(createdComment);

        $("#submit").prop( "disabled", false )
        $("#comment_text").val("")
      });

}


function Comment(id, text, user, company){
  this.id = id
  this.text = text
  this.user = user
  this.company = company

}

Comment.prototype.formatComment = function(){
    return "<li id='comment-"+ this.id +"'><strong>" + this.text + "</strong>"
  }
