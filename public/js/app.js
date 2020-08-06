$(document).foundation()

//lessons content filtering
// shows and hides filtered items
$(".filter-simple-button").click(function() {
    var value = $(this).attr('data-filter');
    if(value === "all") {
      $('.filter-simple-item').show('1000');
    } else {
      $(".filter-simple-item").not('.'+value).hide('3000');
      $('.filter-simple-item').filter('.'+value).show('3000');
    }
  });
  
  // changes active class on filter buttons
  $('.filter-simple-button').click(function () {
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });

  //Log in button
  $("#signin-Login").on("click", function(){
    let userId = $("#userID-Login").val()
    let pwd = $("#pwd-Login").val()
    if (emailIsValid(userId) && pwd.length >= 8 ){
      
        console.log("Am here")

        console.log(userId)
    } 
      else if (userId == ("") || pwd == ("")){
      console.log("A valid email & pwd required")
    } else if (!(emailIsValid(userId))){
      console.log("Please enter a valid email address")
    }
    
  })

  //function to register new account
  

  
  


  //function to validate email
  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  //function to create new student roster entry
  function newStudent() {

  }
  
