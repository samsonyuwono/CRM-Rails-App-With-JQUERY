1. Allow user to click next on company show page to sift through their companies - show resource

2.  Clicking on a Company will render all leads/contacts of the company to show without a page refresh

3. Above will achieve this requirement

4. User will be able to add notes to a account/customer



10/16 EOD
- build comment section for lead or company show page

Build Comments for each Company show page
- Create form
- Create new controller and actions for comments
- Create new comments model- done
- Create new comments serializer- done

Stretch

Decide where to add comments after all other requirements are achieved
- Make each lead in drop-down menu clickable

function nextCompany(){
  // var nextId = parseInt($(".js-next").attr("data-id")) +1
  //get the id on companies index page
  //grab ul and loop thorugh it
  var companyId = []

    $.get('/companies' + '.json', function(data){
      $('.company-list' ).attr("data")
      console.log(data)
      for(var i= 0; i < data.length; i++){
      companyId.push(data["id"])
      }

  })

  // updateView(nextId)
  }
