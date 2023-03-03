$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
        table.search(input.value).draw(); 
     
    })

     //Search Table
     
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
          "<option val='" +element.invoiceNumber +"'>" +
          element.invoiceNumber +
          "</option>";
        $("#QuickBooksInvoice").append(option);
      });
    });
   
    table = $("#table_assignment").DataTable();
     $("#search").on("keyup", function () {
       table.search(this.value).draw();
     })

    $('.js-example-basic-multiple').select2();

    var StockOptions = "";
    // debugger;
    for (let i = 0; i < StockDetails.length; i++) {
      StockOptions+="<option value='"+StockDetails[i].stockname+"'>"+StockDetails[i].stockname+"</option>"
    }
    $("#Selectstock").append(StockOptions);
    $("#Selectstock").change(function(){
      var SelectedStock=$(this).find('option:Selected').val()
      alert(SelectedStock)

      
      let option="<option selected disabled >Choose Parts</option>"
      for(let i=0;i<StockDetails.length;i++){
        // debugger
        if(StockDetails[i].stockname==SelectedStock){
          console.log(StockDetails[i].parts)
          for(let j=0;j<StockDetails[i].parts.length;j++){
            option+="<option>"+StockDetails[i].parts[j].partsnumber+"</option>"
          }
        }
      }
      $("#SelectParts").html(option);
      // $("#SelectParts").append(option);
    })
     var SelectedPartsStock= new Array()
   $(addSelectedParts).click(function(){
    
   
   let SelectedParts=  $("#SelectParts").val()
    let SelectedStock=$("#Selectstock").val()

    let AddToModalTable={
      selectedStock:SelectedStock,
      selectedparts:SelectedParts
    }
    SelectedPartsStock.push(AddToModalTable)
    displaySelectedStockParts()
   

//    list = "";
//    //   "<thead class='thead-dark rounded'><tr><th>Part Number</th><th>Invoice #</th><th>Orered</th><th>Notes</th><th></th></tr></thead><tbody>";
//    for (let i = 0; i < PARTS.length; i++) {
//      if (i == 0) {
//        list =
//          "<thead class='thead-dark'><tr><th>Part Number</th><th>Invoice #</th><th>Ordered</th><th>Notes</th><th></th></tr></thead><tbody>";
//      }
//      list +=
//        "<tr id=" +
//        [i + 1] +
//        "><td>" +
//        PARTS[i].partsnumber +
//        "</td><td>" +
//        PARTS[i].Invoice +
//        "</td><td>" +
//        PARTS[i].Order +
//        "</td><td>" +
//        PARTS[i].notes +
//        "</td><td><button type='button' data-val=" +
//        [i + 1] +
//        " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
//      if (i == PARTS.length - 1) {
//        list += "</tbody>";
//      }
//    }

//    $("#PartsTable").html(list);



    });
    function displaySelectedStockParts(){
      list=""
      for(let i=0;i<SelectedPartsStock.length;i++){
        if(i==0){
          list +="<thead class='thead-dark rounded'><tr><th>Part Number</th><th>Invoice #</th><th>Orered</th><th>Notes</th><th></th></tr></thead><tbody>";  
        }
        
      }
      $("#AssignedPartTable").html(list);

    }
  
    $("#newAssignment").click(function () {
      $("#assignmentModal").modal("show");
    });

    $("#CloseAssignmentModal").click(function () {
      $("#assignmentModal").modal("hide");
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


// $(document).on("click","#SelectParts",function(){
//   debugger
//   $("#SelectParts").css("z-index","-1")
// })
