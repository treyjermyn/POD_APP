$(document).foundation()
import(User)
const handlebars = require("handlebars");
const User = require("./app");

//Instructor class declaration
class Instructor extends User {
    constructor(fname, lname, email, role, classes){
      super(fname, lname, email)
      this.classes = []
      this.role = "Instructor"
    }
    set role (){
      return this.role
    }
    get classes (Array){
      return this.classes = Array;
    }
}

// closes the panel on click outside
$(document).mouseup(function (e) {
    var container = $('#contact-panel');
    if (!container.is(e.target) // if the target of the click isn't the container...
    && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
        container.removeClass('is-active');
      }
});

  //student roster toggling
  $('[data-open-details]').click(function (e) {
    e.preventDefault();
    $(this).next().toggleClass('is-active');
    $(this).toggleClass('is-active');
  });

  //function to create new student roster entry
  function newStudent() {
    
  }