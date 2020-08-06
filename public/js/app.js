$(document).foundation()

const pwd_create = document.getElementById("pwd1");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

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

  //student roster toggling
  $('[data-open-details]').click(function (e) {
    e.preventDefault();
    $(this).next().toggleClass('is-active');
    $(this).toggleClass('is-active');
  });
  
  
  
  //Log in button
  $("#login-Modal")
    .on("invalid.zf.abide", function(ev, elem){
        $("#signin-Login").prop("disabled", true)
  })
    .on("valid.zf.abide", function(ev, elem){
      $("#signin-Login").prop("disabled", false)
      $("#signin-Login").on("click", function(){
        event.preventDefault()
        let userId = $("#userID-Login").val()
        let pwd = $("#pwd-Login").val()
        console.log("Am here")
        //Ajax call here

      })
      


    })
  
  



  //function to register new account
  $("#register-form")
    .on("invalid.zf.abide", function(ev, elem){
      $("#register").prop("disabled", true)
    })
    .on("valid.zf.abide", function(ev, elem){
      $("#register").prop("disabled", false)
      $("#register").on("click", function(){
        event.preventDefault()
        console.log("Am here")
        let fname = $("#fname").val()
        let lname = $("#lname").val()
        let email = $("#mail-register").val()
        let pwd = $("#pwd1").val() 
        //Ajax post call goes here 
        console.log(fname, lname, email, pwd)  


      })
     
    })
  


  


  //Function to create verify password
  pwd_create.onfocus = function() {
    document.getElementById("messagePwd").style.display = "block";
  }
  
  // When the user clicks outside of the password field, hide the message box
  pwd_create.onblur = function() {
    document.getElementById("messagePwd").style.display = "none";
  }
  
  // When the user starts to type something inside the password field
  pwd_create.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(pwd_create.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(pwd_create.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(pwd_create.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(pwd_create.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  


  //function to validate email
  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  
