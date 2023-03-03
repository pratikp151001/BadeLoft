$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");
    var AssignedStocks = new Array();
    // $('.js-example-basic-single').select2();
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
      table.search(input.value).draw();
    });
    var AssignedData = JSON.parse(localStorage.getItem("Assigned"));
    console.log(AssignedData);
    //     $('#assignmentModal').modal({
    //       backdrop: 'static',
    //       keyboard: false
    // })

    //Search Table

    function format(d, ParentRowid) {
      console.log(d);
      let list = "";
      if (d.AssignedParts && d.AssignedParts.length) {
        list +=
          '<table id="childTableofAssigned" cellpadding="5" cellspacing="0" border="0">';
        list +=
          "<thead><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead>";
        list += "<tbody>";
        d.AssignedParts.forEach((element, index) => {
          list +=
            "<tr id=" +
            [index + 1] +
            "><td>" +
            [index + 1] +
            "</td><td>" +
            element.selectedStock +
            "</td><td>" +
            element.selectedparts +
            "</td><td class='deleteparts' data-val=" +
            [index + 1] +
            " data-parentrowid=" +
            [ParentRowid] +
            ">" +
            "<i class='bi bi-x-lg'></i> " +
            "</td>" +
            "</tr>";
        });
      }
      return list;

      // `d` is the original data object for the row
    }
    // datasets = [
    //   ["scas", "scasc", "scsac", "scasc", "scsdc", "dcdsc", "sacdvf"],
    //   ["scas", "scasc", "scsac", "scasc", "scsdc", "dcdsc", "sacdvf"],
    // ];

    StockDetails = JSON.parse(localStorage.getItem("stock"));

    // console.log(StockDetails);
    var table = $("#table_assignment").DataTable({
      data: AssignedData,
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
          data: "quickbooksinvoice",
          title: "QB Invoice #",
          className: "dt-left dt-control",
          defaultContent: "",
        },
        { data: "customer", title: "Name" },
        { data: "createdby", title: "Created By" },
        { data: "createdDate", title: "Created Date" },
        // { title: "Created Date" },
        {
          data: "null",
          title: "Action",
          orderable: false,
          className: "editStock",
          defaultContent:
            "<button type='button' class='btn'><i class='bi bi-pencil-fill Edit '>&nbsp&nbsp</i></button><button type='button' class='btn'><i class='bi bi-trash3-fill'></i></button>",
        },
      ],
      order: [[1, "asc"]],
    });

    // Add event listener for opening and closing details
    $("#table_assignment tbody").on("click", "td.dt-control", function () {
      var tr = $(this).closest("tr");
      var row = table.row(tr);

      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass("shown");
      } else {
        // Open this row
        row.child(format(row.data(), table.row(this).index())).show();
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
          "<option val='" +
          element.invoiceNumber +
          "'>" +
          element.invoiceNumber +
          "</option>";
        $("#QuickBooksInvoice").append(option);
      });
    });

    table = $("#table_assignment").DataTable();
    $("#search").on("keyup", function () {
      table.search(this.value).draw();
    });

    $(".js-example-basic-multiple").select2();

    var StockOptions = "";
    // debugger;
    for (let i = 0; i < StockDetails.length; i++) {
      StockOptions +=
        "<option value='" +
        StockDetails[i].stockname +
        "'>" +
        StockDetails[i].stockname +
        "</option>";
    }
    $("#Selectstock").append(StockOptions);
    $("#Selectstock").change(function () {
      var SelectedStock = $(this).find("option:Selected").val();
      // alert(SelectedStock)

      let option = "<option disabled value='0'>Choose Parts</option>";
      for (let i = 0; i < StockDetails.length; i++) {
        // debugger
        if (StockDetails[i].stockname == SelectedStock) {
          console.log(StockDetails[i].parts);
          for (let j = 0; j < StockDetails[i].parts.length; j++) {
            option +=
              "<option>" + StockDetails[i].parts[j].partsnumber + "</option>";
          }
        }
      }
      $("#SelectParts").html(option);
      // $("#SelectParts").append(option);
    });
    var SelectedPartsStock = new Array();

    $(addSelectedParts).click(function () {
      let SelectedParts = $("#SelectParts").val();
      let SelectedStock = $("#Selectstock").val();
      //  console.log(SelectedParts)
      console.log(SelectedParts.length);
      if (SelectedParts.length == 0) {
        Swal.fire("Please select Stock and Parts");
      } else {
        let AddToModalTable = {
          selectedStock: SelectedStock,
          selectedparts: SelectedParts,
        };
        console.log(AddToModalTable);
        SelectedPartsStock.push(AddToModalTable);
        displaySelectedStockParts();
      }
    });
    function displaySelectedStockParts() {
      // console.log(SelectedPartsStock, "S");

      list = "";
      for (let i = 0; i < SelectedPartsStock.length; i++) {
        if (i == 0) {
          list +=
            "<thead class='thead-dark rounded'><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead><tbody>";
        }
        list +=
          "<tr id=" +
          [i + 1] +
          "><td>" +
          [i + 1] +
          "</td><td>" +
          SelectedPartsStock[i].selectedStock +
          "</td><td>" +
          SelectedPartsStock[i].selectedparts +
          "</td><td><button type='button' data-val=" +
          [i + 1] +
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
        (" class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>");
        if (i == SelectedPartsStock.length - 1) {
          list += "</tbody>";
        }
      }
      $("#AssignedPartTable").html(list);
    }
    $("#saveAssigment").click(function () {
      // alert($("#QuickBooksInvoice").val())
      if ($("#QuickBooksInvoice").val() == null) {
        Swal.fire("Please selecet customer and Invoice");
      } else {
        var Data = JSON.parse(localStorage.getItem("Assigned"));
        let Customer = $("#customer").val();
        alert(Customer);
        let QuickBooksInvoice = $("#QuickBooksInvoice").val();

        if (Data == null) {
          Data = [];
          var newObj = {
            customer: Customer,
            quickbooksinvoice: QuickBooksInvoice,
            AssignedParts: SelectedPartsStock,
            createdby: logedinUser[0].Name,
            createdDate: new Date(),
          };
        } else {
          var newObj = {
            customer: Customer,
            quickbooksinvoice: QuickBooksInvoice,
            AssignedParts: SelectedPartsStock,
            createdby: logedinUser[0].Name,
            createdDate: new Date(),
          };
        }
        Data.push(newObj);
        // console.log(SelectedPartsStock,"DFF")
        table.row.add(newObj).draw();
        localStorage.setItem("Assigned", JSON.stringify(Data));
        SelectedPartsStock = [];
        displaySelectedStockParts();
        document.getElementById("assignmentform").reset();
        $("#assignmentModal").modal("hide");
        //  $("#SelectParts").val()=""
        // console.log(newObj)
      }
    });
    //Delete Parts in Modal
    $(document).on("click", ".cancel", function () {
      let index = parseInt($(this).data("val"));
      // var index=parseInt( $(this).data('val'))-1
      ////alert(index)
      SelectedPartsStock.splice(index - 1, 1);
      displaySelectedStockParts();
    });

    $("#newAssignment").click(function () {
      $("#assignmentModal").modal("show");
    });

    $(".closemodal").click(function () {
      $("#assignmentModal").modal("hide");
      document.getElementById("assignmentform").reset();
    });
    $(document).on("click", ".Edit", function () {
      alert("d");
      alert(table.row(this).parent().index());
    });

    //   var myData = ['New York','Los Angeles','Chicago' ]
    //   $(function() {

    //  var instance = $('#SelectParts').magicSuggest({

    //    data: myData

    //  });

    //  });
  } else {
    window.location.href = "index.html";
  }
});
