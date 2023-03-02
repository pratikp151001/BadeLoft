$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");

    function format(d) {
      // `d` is the original data object for the row
    }
    datasets = [
      ["scas", "scasc", "scsac", "scasc", "scsdc", "dcdsc", "sacdvf"],
      ["scas", "scasc", "scsac", "scasc", "scsdc", "dcdsc", "sacdvf"],
    ];

    StockDetails =JSON.parse(localStorage.getItem("stock"));

    // console.log(StockDetails);
    var table = $("#table_assignment").DataTable({
      data: datasets,
      ordering: false,
      language: {
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>',
        },
      },
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
    var customerInvoice = [
      { customer: "Keneth", invoiceNumber: "15000" },
      { customer: "Keneth", invoiceNumber: "15001" },
      { customer: "Keneth", invoiceNumber: "15002" },
      { customer: "Keneth", invoiceNumber: "15003" },
      { customer: "John", invoiceNumber: "16001" },
      { customer: "John", invoiceNumber: "16002" },
      { customer: "John", invoiceNumber: "16003" },
      { customer: "John", invoiceNumber: "16004" },
      { customer: "Frances", invoiceNumber: "17001" },
      { customer: "Frances", invoiceNumber: "17002" },
      { customer: "Kelly", invoiceNumber: "18001" },
      { customer: "Kelly", invoiceNumber: "18002" },
    ];
    $("#customer").change(function () {
      $("#QuickBooksInvoice").html(
        "<option selected disabled>Choose Invoice</option>"
      );
      const invoice = customerInvoice.filter(
        (m) => m.customer == $("#customer").val()
      );
      invoice.forEach((element) => {
        const option =
          "<option val='" +element.invoiceNumber +
          "'>" +
          element.invoiceNumber +
          "</option>";
        $("#QuickBooksInvoice").append(option);
      });
    });

    $('.js-example-basic-multiple').select2();

    var StockOptions = "";
    debugger;
    for (let i = 0; i < StockDetails.length; i++) {
      StockOptions+="<option value='"+StockDetails[i].stockname+"'>"+StockDetails[i].stockname+"</option>"
    }
    $("#Selectstock").append(StockOptions);
    $("#Selectstock").change(function(){

      $("#SelectParts").html(
        "<option  >Choose Parts</option>"+
        "<option  >Edit Parts</option>"
      );
      $("#SelectParts").append(option);
    })

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

// var selectOptions = '';
// for (i = 0; i < stockData.length; i++) {

//          selectOptions += '<option value="' + stockData[i].StockName + '">' + stockData[i].StockName + '</option>';
//     }
// $("#stockname").append(selectOptions).on('change',function () {
//     debugger
//     var selected = $(this).find('option:selected').val();

//     $("#parts").html("<option selected disabled>Choose parts</option>");
//     const parts = stockData.filter(m => m.StockName == selected);
//     console.log(parts)
//     parts.forEach(element => {
//         debugger;
//         const option = "<option val='" + element.Parts[0].partnumber + "'>" + element.Parts[0].partnumber + "</option>";
//         $("#parts").append(option);
//     });
//     //$('.js-example-basic-multiple').select2();
// });
