const User = require("./app");
const { fn } = require("sequelize");

// closes the panel on click outside
$(document).foundation()

//importing classes
import(User)

class Student extends User{
    constructor(fname, lname, email, role){
      super(fname, lname, email)
      this.role = "student"
    }

    get role(){
      return this.role
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
 

  
  
  