$(document).ready(function(){
  attachListeners()
})

function moreCompany(){
  $(document).ready(function(){
    $('.company').click(function(){
          console.log('clicked')
    });
  });
}

function attachListeners(){
  $("company").click(function(e){
    console.log('clicked')
  })
}
