$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");

    function format(d) {
      // `d` is the original data object for the row
      
    }
    datasets=[['scas','scasc','scsac','scasc','scsdc','dcdsc','sacdvf']]
   
    StockDetails = localStorage.getItem("stock");

    console.log(StockDetails);
    var table = $("#table_assignment").DataTable({
      data: datasets,
      ordering: false,
      columnDefs: [
        { orderable: true, className: "reorder", targets: 0 },
        { orderable: false, targets: "_all" },
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

  

    $("#newAssignment").click(function () {
     
      $("#assignmentModal").modal("show");
    });

    $("#CloseAssignmentModal").click(function () {
      $("#assignmentModal").modal("hide");
    });
  } else {
    window.location.href = "index.html";
  }
});
