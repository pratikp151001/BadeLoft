$(document).ready(function () {
    if (localStorage.getItem("LogedinUser") !== null) {
     $("#navigation").load("Navbar.html");
      
     function format(d) {
          // `d` is the original data object for the row
          return (
            '<table class ="border" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
            "<tr>" +
            "<th>Full name:</th>" +
            "<th>" +
            d.name +
            "</th>" +
            "<th>Extension number:</th>" +
            "<th>" +
            d.extn +
            "</th>" +
            "</tr>" +
            "</table>"
          );
        }
    
        datasets = [
          ["hello", "hcsj", "sdcds", "acsas", "ascas", "scjsnjc", "ndj","wdef"],
          ["scajb", "cjbsaj","wdwad","Fsefcs","edfsd","sdfcsdf","dscds","Sca"],
        ];
         
        StockDetails=localStorage.getItem("stock")
    
        console.log(StockDetails)
        var table = $("#table_assignment").DataTable({
          data: datasets,
          ordering: false,
          columnDefs: [
            { orderable: true, className: 'reorder', targets: 0 },
            { orderable: false, targets: '_all' }
        ],
          columns: [
            {
              className: "dt-control",
              data: null,
              defaultContent: "",
            },
            { title: "QB Invoice #" },
            { title: "Name" },
            { title: "Created By" },
            { title: "Created Date" },
            { title: "Created Date" },
            { title: "Actions" },
          ],
          order: [[1, "asc"]],
        });
    
        // Add event listener for opening and closing details
        $("#table_assignment tbody").on("click", "td", function () {
          var tr = $(this).closest("tr");
          var row = table.row(tr);
    
          if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass("shown");
          } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass("shown");
          }
        });
    
        //DateRange Picker
        $("#etaDate").daterangepicker(
          {
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 1901,
            maxYear: parseInt(moment().format("YYYY"), 10),
          },
          function (start, end, label) {
            var years = moment().diff(start, "years");
            // //alert("You are " + years + " years old!");
          }
        );
  
      $("#navigation").load("Navbar.html");
      //Display name in Navbar

      $("#newAssignment").click(function(){
       $("#assignmentModal").modal("show")
      })

      $("#CloseModal").click(function(){
          $("#assignmentModal").modal("hide")
     })
   
         
}
else {
     window.location.href = "index.html";
     }
});