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
  console.log(nextId)
  $.ajax({
    type: "get",
    url: `/companies/${nextId}/next`
  }).done(function(company) {
    var newCompany = new Company(company.id, company.name, company.revenue, company.customer, company.leads, company.comments)
    newCompany.updateView()
  })
}

function Company(id, name, revenue, customer, leads, comments) {
  this.id = id
  this.name = name
  this.revenue = revenue
  this.customer = customer
  this.leads = leads
  this.comments = comments
}


Company.prototype.updateView = function(){

    var revenueNumber = `<b> Revenue (in thousands): </b> ${this.revenue}`
    var customerStatus = `<b> Customer: </b> ${this.customer}`
    var companyLeads =  `<b> ${this.name}'s Leads/Contacts </b>`

    var leadData= this.leads
    var commentData = this.comments
    var leadList = formatLeadList(leadData) //helper function for formatting
    var commentList = formatCommentList(commentData)

    $("h3").text(this.name)
    $("p.revenue").html(revenueNumber)
    $("p.customer").html(customerStatus)
    $("h4").html(companyLeads)
    $("ul.company-info").html(leadList)
    $(".js-next").attr("data-id", this.id)
    $(".js-previous").attr("data-id", this.id)
    $(".add-lead").html(`<a href="/companies/${this.id}/leads/new">Add a lead/contact</a>`)
    $(".edit-link").html(`<a href="/companies/${this.id}/edit">Edit Company</a>`)
    $(".delete-link").html(`<a href="/companies/${this.id}/destroy">Delete Company</a>`)
    $("#comments").html(commentList)
    $("#company-field").html(`<input value="${this.id}" type="hidden" name="comment[company_id]" id="comment_company_id">`)
}

function formatLeadList(leads){
    var companyLeadInfo = ""
      for (var i = 0; i < leads.length; i++){
          companyLeadInfo += "<li>" + `<a href=showId/leads/` + leads[i].id + `>` + leads[i].name + `</a>` + " " + "|" +
          "<b>" + " Contact?:" + "</b>" + " " + leads[i].contact +  "</li>"
        }
        return companyLeadInfo
}

function formatCommentList(comments){
  var commentInfo = ""
  for (var i = 0; i < comments.length; i++) {
    let com = new Comment(comments[i]["id"],comments[i]["text"],comments[i]["company"]["user_id"],comments[i]["company"]["name"])
    commentInfo += com.formatComment() + " <button class='delete-comment' data='" + com.id + "' onclick='deleteComment(this)'>Delete</button></li>"
  }
  return commentInfo
}


function attachListeners(){
      $(".js-next").click(nextCompany)

      $('form').submit(function(event){
      event.preventDefault()
      createNewComment(this)

    })

    $(".delete-comment").click(function(event){
      event.preventDefault()
      deleteComment(this)
    })
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

        var newComment = new Comment(comment.id, comment.text, comment.user_id, comment.company)

        var createdComment = newComment.formatComment() + " <button class='delete-comment' data='" + comment.id + "' onclick='deleteComment(this)'>Delete</button></li>"
        $("#comments").append(createdComment);

        $("#submit").prop( "disabled", false )
        $("#comment_text").val("")
      });

}

function Comment(id, text, company, user){
  this.id = id
  this.text = text
  this.company = company
  this.user = user
}

Comment.prototype.formatComment = function(){
    return "<li id='comment-"+ this.id +"'>"  this.text
  }
