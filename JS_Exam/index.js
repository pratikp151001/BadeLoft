$(document).ready(function () {
  var logedinuser = JSON.parse(localStorage.getItem("LogedinUser"));
  if (logedinuser != null) {
    window.location.href = "stock.html";
  } else {
    var users = [
      [
        "pratik@gmail.com",
        "Pratik@123",
        "Pratik Patel",
        "Admin",
        "./assets/stock/user.jpg",
      ],
      [
        "alok@gmail.com",
        "Alok@123",
        "Alok",
        "Admin",
        "./assets/stock/user2.jpg",
      ],
    ];
    $.validator.addMethod("Emailcheck", function (value) {
      return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    });
    $.validator.addMethod("password", function (value) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value);
    });

    $("#form").validate({
      rules: {
        email: {
          required: true,
          Emailcheck: true,
        },
        password: {
          required: true,
          password: true,
        },
      },
      messages: {
        email: {
          required: "Enter your Email",
          email:"Please Enter valid email",
          Emailcheck: "Please enter valid email",
        },
        password: {
          required: "Enter your Password",
          password: "Please Enter Proper Password",
        },
      },
      submitHandler: function (form) {
        form.submit();
      },
    });
    var form = $("#form");
    form.validate();
    $("#submit").click(function () {
      var result = form.valid();
      if (result == true) {
        let email = $("#email").val();
        let password = $("#password").val();
        // window.location.href = "stock.html";
        // debugger;

        var logInUser = new Array();
        // debugger;
        for (let i = 0; i < users.length; i++) {
          // alert(users[i][0])
          if (email.toLowerCase() === users[i][0].toLowerCase() && password === users[i][1]) {
            // alert("inside if")
            logInUser.push({
              Name: users[i][2],
              Email: users[i][0],
              Type: users[i][3],
              Picture: users[i][4],
            });
            document.getElementById("form").reset();
            window.location.replace("Dashboard.html");
          }
        }
        document.getElementById("form").reset();
        localStorage.setItem("LogedinUser", JSON.stringify(logInUser));
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User is not Registered!",
        });
      }
    });
  }
});
