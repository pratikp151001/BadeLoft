$(document).ready(function () {

  if (localStorage.getItem('LogedinUser') !== null) {
    var StockDetails=new Array;

    $("#navigation").load("Navbar.html");
     //Display name in Navbar
  var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
  
    //Main Stock Table
  function format(d) {
    // `d` is the original data object for the row
    return (
        '<table class ="border" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Full name:</td>' +
        '<td>' +
        d.name +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extension number:</td>' +
        '<td>' +
        d.extn +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
    );
}

datasets=[
  ['hello','hcsj','sdcds','acsas','ascas','scjsnjc','ndj'],
  ['scajb','cjbsaj']
]

  var table = $('#table_div1').DataTable({
      data:datasets,
      "ordering": false,
      columns: [
          {
              className: 'dt-control',
              orderable: false,
              data: null,
              defaultContent: '',
          },
          { title: 'Stock Name' },
          { title: 'ETA Date' },
          { title: 'Stock Location' },
          { title: 'Created By' },
          { title: 'Created Date' },
          { title: 'Notes' },
          { title: 'Actions' },
      ],
      order: [[1, 'asc']],
  });

  // Add event listener for opening and closing details
  $('#table_div1 tbody').on('click', 'td.dt-control', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);

      if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
      } else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass('shown');
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
      // alert("You are " + years + " years old!");
    }
  );
  //Logout

  $("#addStock").click(function () {
    debugger;
    $("#addStockModal").modal("show");
  });
  $(".closemodalStock").click(function () {
    debugger;
    $("#addStockModal").modal("hide");
  });

  //Open AddParts Modal
  $(document).on('click',"#addParts",function(){
    
   
    // console.log(StockDetails)

    // localStorage.setItem("stocks",JSON.stringify(StockDetails))
    $("#addPartsModal").modal("show");
  })
  var PARTS=new Array;
  $(document).on('click',"#saveparts",function(){
    alert("Add Parts Called")
    let PartNumber=$("#PartNumber").val()
    let Ordered=$("#Ordered").val()
    let Notes=$("#Notes").val()

    console.log(PartNumber)
     
    var obj={
      partsnumber : PartNumber,
      Order:Ordered,
      notes:Notes
    }
    
    PARTS.push(obj)
    console.log(PARTS)
    $("#addPartsModal").modal("hide");
    
  })

  $(document).on('click',"#savestock",function(){
    let StockName=$("#stockName").val()
    let ETADate=$("#etaDate").val()
    let ele=document.getElementsByName("status");
    let Status="";
    // alert(StockName)
    // alert(ETADate)

    for(i = 0; i < ele.length; i++) {
      if(ele[i].checked)
      
            {
              Status=ele[i].value
            }
    }
    var Stocks=JSON.parse(localStorage.getItem("stocks"))
    if(Stocks==null){
      StockDetails=[]
      StockDetails.push({
        stockname : StockName,
        Etadate : ETADate,
        status:Status,
        parts:PARTS
      })

    }
    else{
      StockDetails.push({
        stockname : StockName,
        Etadate : ETADate,
        status:Status,
        parts:PARTS
      
      })
    }
    console.log(StockDetails)

    localStorage.setItem("stock",JSON.stringify(StockDetails))
    $("#addStockModal").modal("hide");
    
  }
  )

  $(document).on('click',".closemodalParts",function(){
    
    $("#addPartsModal").modal("hide");
  })

} else {
window.location.href="index.html"
}
 
});
