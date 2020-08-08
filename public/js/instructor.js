$(document).foundation()
// import(User)
// const handlebars = require("express-handlebars");
// const User = require("./app");

// //Instructor class declaration
// class Instructor extends User {
//     constructor(fname, lname, email, role, classes){
//       super(fname, lname, email)
//       this.classes = []
//       this.role = "Instructor"
//     }
//     get role (){
//       return this.role
//     }
//     get classes (Array){
//       return this.classes = Array;
//     }
// }

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

    

    // first create a Student Roster TABLE structure by adding few headers.
    function createTable() {
        let headerArray = ['First Name', 'Last Name', 'Email Address', '']; // table headers.
        let emptyTable = $('<thead>');
        emptyTable.attr('id', 'emptyTable');  // table id.
        emptyTable.attr('class', 'responsive-card-table unstriped');  // table class.

        let tBody = $("<tbody>")
        let tr = $("<tr>");

        for (let i = 0; i < headerArray.length; i++) {
            let th = $('<th>'); // the header object.
            th.attr('id', 'table-header')
            
            th.text(headerArray[i]);
            tr.append(th);
        }
        tBody.append(tr);
        emptyTable.append(tr);

        let div = $('.table-expand');
        div.append(emptyTable);    // add table to a container.
    }
    createTable();

    // function to add new row.
    function addRow() {
        var empTab = $('#emptyTable');

        var rowCnt = empTab.rows.length;    // get the number of rows.
        var tr = empTab.insertRow(rowCnt); // table row.
        tr = empTab.insertRow(rowCnt);

        let newStudent = {
          firstName: $(".student-first-name").value,
          lastName: $(".student-last-name").value,
          email: $(".student-email").value
        };

        for (let c = 0; c < headerArray.length; c++) {
            let firstName = $('<td>').addClass("first-name");          // TABLE DEFINITION.
            firstName.text(newStudent.firstName);
            
            var lastName = $('<td>').addClass("last-name");          // TABLE DEFINITION.
            lastName.text(newStudent.lastName);
            
            var email = $('<td>').addClass("email");          // TABLE DEFINITION.
            email.text(newStudent.email);

            if (c == 3) {   // if its the 3rd column of the table.
                // add a button control.
                let button = $('<input>');

                // set the attributes.
                button.attr('type', 'button');
                button.attr('value', 'Delete');

                // add button's "onclick" event.
                button.attr('onclick', 'removeRow(this)');

                td.append(button);
            }
            else {
                // the 1st, 2nd and 3rd column will have textbox.
                var ele = $('<input>');
                ele.attr('type', 'text');
                ele.attr('value', '');

                td.append(ele);
            }
        }
    }

    // function to delete a row.
    function removeRow(oButton) {
        var empTab = $('#emptyTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
    }

    // function to extract and submit table data.
    function submit() {
        var myTab = $('#emptyTable');
        var arrValues = new Array();

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length - 1; row++) {
            // loop through each cell in a row.
            for (c = 0; c < myTab.rows[row].cells.length; c++) {
                var element = myTab.rows.item(row).cells[c];
                if (element.childNodes[0].attr('type') == 'text') {
                    arrValues.push("'" + element.childNodes[0].value + "'");
                }
            }
        }
        
        // finally, show the result in the console.
        console.log(arrValues);
  }
    
  
   // function to create new table row entry with add student button click
   $(".student-modal-submit-button").on("click", function () {
      newStudent();
  });
