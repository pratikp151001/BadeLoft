$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    var StockDetails = new Array();

    $("#navigation").load("Navbar.html");
    //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    var table;
    function format(d) {
      //debugger;
      console.log(d.parts);
      let list = "";
      if (d.parts && d.parts.length > 0) {
        list +=
          '<table id="childTable" cellpadding="5" cellspacing="0" border="0">';
        list +=
          "<thead><tr><th>#</th><th>Part Number</th><thOrdered</th><th>Assigned</th><th>Notes</th><th>Action</th></tr></thead>";
        list += "<tbody>";
        d.parts.forEach((partdetail, index) => {
          list +=
            "<tr id=" +
            [index + 1] +
            "><td>" +
            [index + 1] +
            "</td><td>" +
            partdetail.partsnumber +
            "</td><td>" +
            partdetail.Order +
            "</td><td>" +
            partdetail.notes +
            "</td><td class='deleteparts'>" +
            "<i data-val=" +
            [index + 1] +
            " class='bi bi-x-lg'></i> " +
            "</td>" +
            "</tr>";
        });
        list += "</tbody></table>";
      }
      return list;
    }

    var STOCKS = JSON.parse(localStorage.getItem("stock"));

    // console.log(StockDetails[1].stockname)
    table = $("#table_stocks").DataTable({
      order: [],
      deferRender: true,
      language: {
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>',
        },
      },
      // "dom": 'rtip',
      columnDefs: [
        { className: "dt-left", targets: [0] },
        { className: "dt-center", targets: [1, 2, 3, 4, 5, 6] },
        // { width: "10px", targets: [0] },
        { width: "15%", targets: [0] },
        { width: "25%", targets: [5] },
      ],
      data: STOCKS,
      bInfo: true,
      columns: [
        // {
        //   className: "dt-control",
        //   data: null,
        //   defaultContent: "",
        //   orderable: false,
        // },
        {
          data: "stockname",
          title: "Stock Name",
          className: "dt-control",
          orderable: false,
        },
        { data: "Etadate", title: "ETA Date", orderable: false },
        { data: "status", title: "Stock Location", orderable: false },
        { data: "createdBy", title: "Created By", orderable: false },
        { data: "createdDate", title: "Created Date", orderable: false },
        { data: "parts[0].notes", title: "Notes", orderable: false },

        {
          data: "null",
          title: "Action",
          orderable: false,
          className: "editStock",
          defaultContent:
            "<i class='bi bi-pencil-fill '>&nbsp&nbsp</i><i class='bi bi-clock-history .historyStock'></i>",
        },
      ],
    });

    // Add event listener for opening and closing details
    $("#table_stocks tbody").on("click", "td", function () {
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
    $("#table_stocks tbody").on("click", "td.editStock", function () {
      // //debugger;
      // console.log("A");
      // console.log(table.row(this).data())
      let SelectedData = table.row(this).data();
      let index = table.row(this).index();
      // //alert(index)
      // // document.getElementsByName("status").values=SelectedData.status;
      // console.log(table.row(this).data().parts)
      EditStock(SelectedData, index);
    });

    //DateRange Picker
    $("#etaDate").daterangepicker(
      {
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2023,
        maxYear: 2030,
        placeholder:"MM/DD/YYYY"
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
        // ////alert("You are " + years + " years old!");
      }
    );

    $("#addStock").click(function () {
      $("#addStockModal").modal("show");
      PartsTableDIsplay();
    });
    $(".closemodalStock").click(function () {
      PARTS = [];
      document.getElementById("addStocks").reset();
      $(".save").attr("id", "savestock");
      // $("#stockName").removeAttr("disabled");

      $(".error").html("");

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
        let d = new Date();
        let Invoice =
          "" +
          d.getDate() +
          d.getHours() +
          d.getMinutes() +
          d.getMilliseconds();

        // // ////alert("all"+Invoice)
        // console.log(PARTS);
        var check = true;
        for (let i = 0; i < PARTS.length; i++) {
          if (PARTS[i].partsnumber == PartNumber) {
            check = false;
            Swal.fire("PArt is Already present");
          }
        }
        if (check == true) {
          var obj = {
            partsnumber: PartNumber,
            Order: Ordered,
            notes: Notes,
            Invoice: Invoice,
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

      // //debugger;
      if (AddStockResult == true) {
        if (PARTS.length != 0) {
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          // ////alert(StockName)
          // ////alert(ETADate)

          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          // var CreatedDate=new Date()
          // ////alert(CreatedDate)
          // console.log(CreatedDate)
          const d = new Date();
          date = d.getDate();
          month = d.getMonth() + 1;
          year = d.getFullYear();
          var created_date = month + "/" + date + "/" + year;
          console.log(created_date);
          StockDetails = JSON.parse(localStorage.getItem("stock"));

          if (StockDetails == null) {
            StockDetails = [];
            var newObj = {
              stockname: StockName,
              Etadate: ETADate,
              status: Status,
              createdBy: logedinUser[0].Name,
              createdDate: created_date,
              parts: PARTS,
            };
            // StockDetails.push({
            //   stockname: StockName,
            //   Etadate: ETADate,
            //   status: Status,
            //   createdBy: logedinUser[0].Name,
            //   createdDate: created_date,
            //   parts: PARTS,
            // });
          } else {
            var Value = true;
            for (let i = 0; i < StockDetails.length; i++) {
              if (StockDetails[i].stockname == StockName) {
                Value = false;
                Swal.fire("Stock Number is already Present");
              }
            }
            if (Value == true) {
              var newObj = {
                stockname: StockName,
                Etadate: ETADate,
                status: Status,
                createdBy: logedinUser[0].Name,
                createdDate: created_date,
                parts: PARTS,
              };
            }
            // console.log(StockDetails)
          }
          StockDetails.push(newObj);
          table.row.add(newObj).draw();
          localStorage.setItem("stock", JSON.stringify(StockDetails));
          document.getElementById("addStocks").reset();

          PARTS = [];
          $("#addStockModal").modal("hide");

          // //debugger;
        } else {
          Swal.fire("Please Enter At Least 1 Part");
        }
      }
    });

    $(document).on("click", ".closemodalParts", function () {
      $("#addPartsModal").modal("hide");
      document.getElementById("AddParts").reset();
    });

    //Display Parts in Addstack modal
    function PartsTableDIsplay() {
      list = "";
      //   "<thead class='thead-dark rounded'><tr><th>Part Number</th><th>Invoice #</th><th>Orered</th><th>Notes</th><th></th></tr></thead><tbody>";
      for (let i = 0; i < PARTS.length; i++) {
        if (i == 0) {
          list =
            "<thead class='thead-dark'><tr><th>Part Number</th><th>Invoice #</th><th>Ordered</th><th>Notes</th><th></th></tr></thead><tbody>";
        }
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
          "</td><td><button type='button' data-val=" +
          [i + 1] +
          " class='cancel  btn'><i class='bi bi-x-lg'></button></td></tr>";
        if (i == PARTS.length - 1) {
          list += "</tbody>";
        }
      }

      $("#PartsTable").html(list);
    }

    //Delete Parts in AddstockModal
    $(document).on("click", ".cancel", function () {
      let index = parseInt($(this).data("val"));
      // var index=parseInt( $(this).data('val'))-1
      ////alert(index)
      PARTS.splice(index - 1, 1);
      PartsTableDIsplay();
    });

    //Search Table
    table = $("#table_stocks").DataTable();
    $("#search").on("keyup", function () {
      table.search(this.value).draw();

      // Delete Parts From Stocks Table

      //  $(document).on('click','.deleteparts',function(){
      //   //debugger
      //   let index=$(this).attr('data-val')
      //   //alert(inde)
      //  })
    });
    function EditStock(SelectedData, index) {
      $("#addStockModal").modal("show");
      $(".error").html("");
      $(".save").attr("id", "editstock");
      $("#stockName").val(SelectedData.stockname);
      $("#etaDate").val(SelectedData.Etadate);
      $("#hidden").val(index);
      PARTS = SelectedData.parts;
      // $("#stockName").attr("disabled", "disabled");
      PartsTableDIsplay();
    }
    $(document).on("click", "#editstock", function () {
      let EditStockResult = form1.valid();

      // console.log(PARTS.length);

      // //debugger;
      if (EditStockResult == true) {
        if (PARTS.length != 0) {
          let Index = $("#hidden").val();
          //alert(Index);
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          const d = new Date();
          date = d.getDate();
          month = d.getMonth() + 1;
          year = d.getFullYear();
          var created_date = month + "/" + date + "/" + year;
          console.log(created_date);
          StockDetails = JSON.parse(localStorage.getItem("stock"));
          var newObj = {
            stockname: StockName,
            Etadate: ETADate,
            status: Status,
            createdBy: logedinUser[0].Name,
            createdDate: created_date,
            parts: PARTS,
          };
          console.log(newObj);
          //debugger
          StockDetails[Index] = newObj;
          //  table.row.add({ foo: 1 }).draw();
          // //debugger;

          //   let check=true
          //  for(let j=0;j<StockDetails.length;j++){
          //   if(StockName==StockDetails[j].stockname){
          //     check==false
          //   }
          //  }
          //    if(check==true){
          //   for (let i = 0; i < StockDetails.length; i++) {
          //     if (oldStockName == StockDetails[i].stockname) {
          //       StockDetails[i] = newObj;

          //       // table.row.add(newObj).draw();
          //     }
          //   }
          // }else{
          // //alert("Stock name is already present")
          // }
          $(".save").attr("id", "savestock");
          // $("#stockName").removeAttr("disabled");

          // console.log(StockDetails)
          localStorage.setItem("stock", JSON.stringify(StockDetails));
          location.reload(true);
          // $("#table_stocks").dataTable().clear().draw();
          // $("#table_stocks").dataTable().fnDestroy()
          // console.log(StockDetails)
          // table.draw(true)
        } else {
          Swal.fire("Please enter at least 1 part");
        }
      }
    });
  } else {
    window.location.href = "index.html";
  }
});
