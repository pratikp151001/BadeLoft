$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    var StockDetails = new Array();

    $("#navigation").load("Navbar.html");
    //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));

    // //Main Stock Table
    // function format(d) {
    //   // `d` is the original data object for the row
    //   return (
    //     '<table class ="border" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px; width:100%">' +
    //     "<tr>" +
    //     "<th>Full name:</th>" +
    //     "<th>" +
    //     d.name +
    //     "</th>" +
    //     "<th>Extension number:</th>" +
    //     "<th>" +
    //     d.extn +
    //     "</th>" +
    //     "</tr>" +
    //     "</table>"
    //   );
    // }

    datasets = [
      ["hello", "hcsj", "sdcds", "acsas", "ascas", "scjsnjc", "ndj","wdef"],
      ["scajb", "cjbsaj","wdwad","Fsefcs","edfsd","sdfcsdf","dscds","Sca"],
    ];
     
    console.log(StockDetails[1].stockname)
    var table = $("#table_div1").DataTable({
      data: localStorage.getItem("stock"),
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
        
        { data: "stockname",title:"Stock Name" },
        { data: "Etadate",title:"Eta Date" },
        { data: "status",title:"Status" },
        
      ],
      order: [[1, "asc"]],
    });

    // Add event listener for opening and closing details
    $("#table_div1 tbody").on("click", "td", function () {
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

    $("#addStock").click(function () {
      $("#addStockModal").modal("show");
      PartsTableDIsplay();
    });
    $(".closemodalStock").click(function () {
      PARTS = [];
      document.getElementById("addStocks").reset();
      $("#addStockModal").modal("hide");
    });

    //Open AddParts Modal
    $(document).on("click", "#addParts", function () {
      // console.log(StockDetails)

      // localStorage.setItem("stocks",JSON.stringify(StockDetails))
      $("#addPartsModal").modal("show");
    });
    //Validate Parts
    $.validator.addMethod("Numbers", function (value) {
      return /^\d+$/.test(value);
    });
    $("#AddParts").validate({
      rules: {
        PartNumber: {
          required: true,
        },
        Ordered: {
          required: true,
          Numbers: true,
        },
        Notes: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please Enter Partnumber",
        },
        Ordered: {
          required: "Please Enter Order",
          Numbers: "Please Enter Numbers",
        },
        Notes: {
          required: "Please Enter Notes",
        },
      },
      submitHandler: function (form) {
        form.submit();
      },
    });
    var form = $("#AddParts");
    form.validate();

    //Add Parts
    var PARTS = new Array();
    $(document).on("click", "#saveparts", function () {
      var resultaddparts = form.valid();
      if (resultaddparts == true) {
        let PartNumber = $("#PartNumber").val();
        let Ordered = $("#Ordered").val();
        let Notes = $("#Notes").val();
        let  d=new Date()
        let Invoice=""+d.getDate()+d.getHours()+d.getMinutes()+d.getMilliseconds()
       
        // // //alert("all"+Invoice)
        // console.log(PARTS);
        var check=true
        for(let i=0;i<PARTS.length;i++){
          if(PARTS[i].partsnumber==PartNumber){
            check=false
            Swal.fire("PArt is Already present")
          }
        }
        if(check==true){
          var obj = {
            partsnumber: PartNumber,
            Order: Ordered,
            notes: Notes,
            Invoice:Invoice,
          };
        }
      
        PARTS.push(obj);
        console.log(PARTS);
        $("#addPartsModal").modal("hide");
        document.getElementById("AddParts").reset();
        PartsTableDIsplay();
      }
    });
    //Validate Parts
    $("#addStocks").validate({
      rules: {
        stockName: {
          required: true,
        },
        etaDate: {
          required: true,
        },
      },
      messages: {
        name: {
          required: "Please Enter Stock Name",
        },
        Ordered: {
          required: "Please Enter ETADate",
        },
      },
      submitHandler: function (form1) {
        form1.submit();
      },
    });
    var form1 = $("#addStocks");
    form1.validate();

    $(document).on("click", "#savestock", function () {
      let AddStockResult = form1.valid();

      console.log(PARTS.length);

      debugger;
      if (AddStockResult == true && PARTS.length != 0) {
        var StockName = $("#stockName").val();
        var ETADate = $("#etaDate").val();
        let ele = document.getElementsByName("status");
        var Status = "";
        // //alert(StockName)
        // //alert(ETADate)

        for (i = 0; i < ele.length; i++) {
          if (ele[i].checked) {
            Status = ele[i].value;
          }
        }
        // var CreatedDate=new Date()
        // //alert(CreatedDate)
        // console.log(CreatedDate)

        var StockDetails = JSON.parse(localStorage.getItem("stock"));

        if (StockDetails == null) {
          StockDetails = [];
          StockDetails.push({
            stockname: StockName,
            Etadate: ETADate,
            status: Status,
            parts: PARTS,
          });
        } else {
          var Value = true;
          for (let i = 0; i < StockDetails.length; i++) {
            if (StockDetails[i].stockname == StockName) {
              Value = false;
              Swal.fire("Stock Number is already Present");
            }
          }
          if (Value == true) {
            StockDetails.push({
              stockname: StockName,
              Etadate: ETADate,
              status: Status,
              parts: PARTS,
            });
          }
          // console.log(StockDetails)
        }
        localStorage.setItem("stock", JSON.stringify(StockDetails));
        document.getElementById("addStocks").reset();
        PARTS = [];
        $("#addStockModal").modal("hide");
      } else {
        Swal.fire("Please Enter At Least 1 Part");
      }
    });

    $(document).on("click", ".closemodalParts", function () {
      $("#addPartsModal").modal("hide");
      document.getElementById("AddParts").reset();
    });

    //Display Parts in Addstack modal
    function PartsTableDIsplay() {
      list =
        "<thead class='thead-dark rounded'><tr><th>Part Number</th><th>Invoice #</th><th>Orered</th><th>Notes</th><th></th></tr></thead><tbody>";
      for (let i = 0; i < PARTS.length; i++) {
        list +=
          "<tr id=" +
          [i + 1] +
          "><td>" +
          PARTS[i].partsnumber +
          "</td><td>" +
          PARTS[i].Invoice +
          "</td><td>" +
          PARTS[i].Order +
          "</td><td>" +
          PARTS[i].notes +
          "</td><td><button type='button' data-val="+[i+1] +" class='cancel  btn'><i class='fa-solid fa-rectangle-xmark'></i></button></td></tr>";
      }
      list += "</tbody>";
      $("#PartsTable").html(list);
    }
    //Delete Parts in AddstockModal
    $(document).on("click",".cancel",function(){
      let index=parseInt($(this).data("val"))
      // var index=parseInt( $(this).data('val'))-1
      //alert(index)
      PARTS.splice(index-1,1)
PartsTableDIsplay()
    })
}

  else {
    window.location.href = "index.html";
  }
});
