$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");
    //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));

    function format(d) {
      // `d` is the original data object for the row
      return (
        '<table id="StatusChildTable" class="table"><thead><tr>' +
        "<th >#</th>" +
        " <th>Part Number</th>" +
        '<th scope="col">Stock Location</th>' +
        '<th scope="col">Action</th>' +
        "</tr>" +
        "</thead>" +
        '<tbody class="table-group-divider">' +
        "<tr>" +
        "<td >1</td>" +
        "<td>WB-01-S-M</td>" +
        "<td>warehouse</td>" +
        '<td><i class="bi bi-x"></i></td>' +
        "</tr>" +
        "<tr>" +
        '<td scope="row">2</td>' +
        "<td>Jacob</td>" +
        "<td>Thornton</td>" +
        '<td><i class="bi bi-x"></i></td>' +
        "</tr>" +
        "<tr>" +
        '<td scope="row">3</td>' +
        "<td >Larry the Bird</td>" +
        "<td>Thornton</td>" +
        '<td><i class="bi bi-x"></i></td>' +
        "</tr>" +
        "</tbody>" +
        "</table>"
      );
    }

    datasets = [
      [
        "150000",
        "Kenneth Woodard",
        "12/08/2021",
        '<span class="alert alert-primary"><i class="bi bi-check"></i>Paid</span>',
        "Shipped",
        "615-245-4158",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>',
        "WBC-123",
      ],
      [
        "150001",
        "James Fenske",
        "10/08/2021",
        '<span class="alert alert-success"><i class="bi bi-check"></i>Paid</span>',
        "STD",
        "617-235-7627",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">',
        "WBC-124",
      ],
      [
        "150002",
        "Kenneth",
        "05/08/2021",
        '<span class="alert alert-success"><i class="bi bi-check"></i>Paid</span>',
        "Shipped",
        "617-235-7627",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>',
        "",
      ],
      [
        "150003",
        "Tasha Tapia",
        "05/08/2021",
        '<span class="alert alert-danger"><i class="bi bi-x"></i>UnPaid</span>',
        "STD",
        "617-235-7627",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" >',
        "WBC-123",
      ],
      [
        "150004",
        "Kenneth",
        "12/08/2021",
        '<span class="alert alert-success"><i class="bi bi-check"></i>Paid</span>',
        "Shipped",
        "617-235-7627",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>',
        "WBC-125",
      ],
      [
        "150005",
        "Kenneth",
        "12/08/2021",
        '<span class="alert alert-warning"><i class="bi bi-exclamation-circle"></i>Pending Approval</span>',
        "STD",
        "617-235-7627",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" >',
        "",
      ],
      [
        "150006",
        "Kenneth",
        "12/08/2021",
        '<span class="alert alert-success"><i class="bi bi-check"></i>Paid</span>',
        "Shipped",
        "201-905-4664",
        '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">',
        "WBC-126",
      ],
    ];

    var table = $("#table_status").DataTable({
      data: datasets,
      language: {
        "info": "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>' 
        }
      },
      columnDefs: [{
        "defaultContent": "-",
        "targets": "_all"},
        {
            className: "dt-center",
            targets: [1, 2, 3, 4, 5,6,7],
          },
          {
            className: "dt-left",
            targets: [0],
          },

        
      ],
      columns: [
        {
          className: "dt-control",
          title: "QB Invoice",
        },
        { title: "Name", orderable: true },
        { title: "QB Ship date", orderable: true },
        { title: "QB Payment Status", orderable: false },
        { title: "QB status", orderable: false },
        { title: "QB Delivery Phone", orderable: false },
        { title: "Called", orderable: false },
        { title: "Tracking", orderable: false },
      ],
      order: [[1, "asc"]],
    });

    // Add event listener for opening and closing details
    $("#table_status tbody").on("click", "td", function () {
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

    var Status_table = $("#table_status").DataTable();

    // #myInput is a <input type="text"> element
    $("#searchStatusTable").on("keyup", function () {
      Status_table.search(this.value).draw();
    });
  } else {
    window.location.href = "index.html";
  }
});
