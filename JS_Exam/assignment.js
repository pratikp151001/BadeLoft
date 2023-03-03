$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    $("#navigation").load("Navbar.html");
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
        table.search(input.value).draw(); 
     
    })
//     $('#assignmentModal').modal({
//       backdrop: 'static',
//       keyboard: false
// })

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
      // alert(SelectedStock)

      
      let option="<option selected disabled value='0'>Choose Parts</option>"
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
      selectedparts:SelectedParts,
     
    }
    console.log(AddToModalTable)
    SelectedPartsStock.push(AddToModalTable)
    displaySelectedStockParts()
    document.getElementById("assignmentform").reset()

    });
    function displaySelectedStockParts(){
      list=""
      for(let i=0;i<SelectedPartsStock.length;i++){
        if(i==0){
          list +="<thead class='thead-dark rounded'><tr><th>#</th><th>Stock</th><th>Part</th><th>Action</th></tr></thead><tbody>";  
        }
        list +=
          "<tr id=" +
          [i + 1] +
          "><td>" +
          [i+1] +
          "</td><td>" +
          SelectedPartsStock[i].selectedStock +
          "</td><td>" +
          SelectedPartsStock[i].selectedparts +
          "</td><td><button type='button' data-val=" +
          [i + 1] +
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
          if (i == SelectedPartsStock.length - 1) {
            list += "</tbody>";
          }
      }
      $("#AssignedPartTable").html(list);

    }
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
    });
    $("#saveAssigment").click(function () {
      let Customer=$("#customer").val()
      let QuickBooksInvoice=$("#QuickBooksInvoice").val()
      var newObj={
        customer:Customer,
        quickbooksinvoice:QuickBooksInvoice,
        AssignedParts:SelectedPartsStock,
        createdby:logedinUser[0].Name
        
      }
      console.log(newObj)
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