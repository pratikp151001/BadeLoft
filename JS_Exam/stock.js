$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    var StockDetails = new Array();

    $("#navigation").load("Navbar.html");
    //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    var table;
    function format(d, ParentRowid) {
      //debugger;
      // //alert(ParentRowid)
      //console.log(d.parts);
      let list = "";
      if (d.parts && d.parts.length > 0) {
        list +=
          '<table id="childTable" cellpadding="5" cellspacing="0" border="0">';
        list +=
          "<thead><tr><th>#</th><th>Part Number</th><th>Ordered</th><th>Assigned</th><th>Action</th></tr></thead>";
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
            "</td><td class='deleteparts' data-val=" +
            [index + 1] +
            " data-parentrowid=" +
            [ParentRowid] +
            ">" +
            "<i class='bi bi-x-lg'></i> " +
            "</td>" +
            "</tr>";
        });
        list += "</tbody></table>";
      }
      return list;
    }

    var STOCKS = JSON.parse(localStorage.getItem("stock"));
    debugger;
    // //console.log(StockDetails[1].stockname)
    table = $("#tableStocks").DataTable({
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
        { className: "dt-left", targets: [0, 2, 6] },
        { className: "dt-center", targets: [1, 3, 4, 6] },
        // { width: "10px", targets: [0] },
        { width: "15%", targets: [0] },
        { width: "15%", targets: [5] },
        { width: "20%", targets: [2] },
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
          className: "dt-control ShowChildrow",
          orderable: false,
        },
        {
          data: "Etadate",
          title: "ETA Date",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "status",
          title: "Stock Location",
          orderable: false,
          render: function (data, type, row) {
            if (type === "display") {
              // console.log(data)
              // console.log(type)
              // console.log(row)
              let changebtn = `
                <td>
                <div class="row">
                <div class="col-md-4 ">
                      <div class="dropdown">
                        <a class="btn btn-outline-primary dropdown-toggle" role="button" id="Stock_loc${row.stockname}" data-bs-toggle="dropdown" aria-expanded="false">
                        change
                         </a>
          
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Warehouse">
                          <label for="Stock-Location${row.stockname}">OnWareHouse</label>
                        </li>
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Water" >
                          <label for="Stock-Location${row.stockname}">OnWater</label>
                        </li>
                        <li class="dropdown-item">
                          <input type="radio" class="from-check-input Stock_location" name="Stock-Location${row.stockname}" value="On Production">
                          <label for="Stock-Location${row.stockname}">OnProduction</label>
                        </li>
                           
                       </ul>
                       
                       </div>
                  </div>
                  <div class="col-md-6 ">
                  <div id="statuss">
                    ${data}
                  </div>
                </div>
                </td>`;
              // console.log(data)
              return changebtn;
            }
            return data;
          },
        },
        {
          data: "createdBy",
          title: "Created By",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "createdDate",
          title: "Created Date",
          orderable: false,
          className: "ShowChildrow",
        },
        {
          data: "parts[0].notes",
          title: "Notes",
          orderable: false,
          className: "ShowChildrow",
        },

        {
          data: "null",
          title: "Action",
          orderable: false,
          // className: "editStock",
          defaultContent:
            "<button type='button' class='btn EditStock'><i class='bi bi-pencil-fill  '>&nbsp&nbsp</i></button><button type='button' class='btn Audit'><i class='bi bi-clock-history .historyStock'></i></button>",
        },
      ],
    });

    // Add event listener for opening and closing details
    $("#tableStocks tbody").on("click", "td.ShowChildrow", function () {
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
    //DateRange Picker
    $("#etaDate").daterangepicker(
      {
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2023,
        maxYear: 2030,
        placeholder: "MM/DD/YYYY",
      },
      function (start, end, label) {
        var years = moment().diff(start, "years");
        // //////alert("You are " + years + " years old!");
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
      // //console.log(StockDetails)

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

        // // //////alert("all"+Invoice)
        // //console.log(PARTS);
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
        //console.log(PARTS);
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

      //console.log(PARTS.length);

      // //debugger;
      if (AddStockResult == true) {
        if (PARTS.length != 0) {
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          // //////alert(StockName)
          // //////alert(ETADate)

          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          // var CreatedDate=new Date()
          // //////alert(CreatedDate)
          // //console.log(CreatedDate)
          // const d = new Date();
          // date = d.getDate();
          // month = d.getMonth() + 1;
          // year = d.getFullYear();
          createddate = new Date();
          createddate = createddate.toLocaleDateString();

          StockDetails = JSON.parse(localStorage.getItem("stock"));

          if (StockDetails == null) {
            StockDetails = [];
            var newObj = {
              stockname: StockName,
              Etadate: ETADate,
              status: Status,
              createdBy: logedinUser[0].Name,
              createdDate: createddate,
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
                createdDate: createddate,
                parts: PARTS,
              };
            }
            // //console.log(StockDetails)
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
      //////alert(index)
      PARTS.splice(index - 1, 1);
      PartsTableDIsplay();
    });

    //Search Table
    table = $("#tableStocks").DataTable();
    $("#search").on("keyup", function () {
      table.search(this.value).draw();

      // Delete Parts From Stocks Table

      $(document).on("click", ".deleteparts", function () {
        let index = $(this).attr("data-val");
        ////alert(inde)
      });
    });
    // function EditStock(SelectedData, index) {

    // }
    $(document).on("click", ".EditStock", function () {
      let Index = table.row($(this).parents("tr")).index();
      //alert(Index)
      let SelectedRowData = table.row(Index).data();
      //console.log(SelectedRowData)
      $("#addStockModal").modal("show");
      $(".error").html("");
      $(".save").attr("id", "editstock");
      $("#stockName").val(SelectedRowData.stockname);
      $("#etaDate").val(SelectedRowData.Etadate);
      $("#hidden").val(Index);
      PARTS = SelectedRowData.parts;
      // $("#stockName").attr("disabled", "disabled");
      PartsTableDIsplay();
    });
    $(document).on("click", "#editstock", function () {
      let EditStockResult = form1.valid();

      // //console.log(PARTS.length);

      // //debugger;
      if (EditStockResult == true) {
        if (PARTS.length != 0) {
          let Index = $("#hidden").val();
          ////alert(Index);
          var StockName = $("#stockName").val();
          var ETADate = $("#etaDate").val();
          let ele = document.getElementsByName("status");
          var Status = "";
          for (i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
              Status = ele[i].value;
            }
          }
          createddate = new Date();
          createddate = createddate.toLocaleDateString();

          // //console.log(created_date);
          StockDetails = JSON.parse(localStorage.getItem("stock"));
          var newObj = {
            stockname: StockName,
            Etadate: ETADate,
            status: Status,
            createdBy: logedinUser[0].Name,
            createdDate: createddate,
            parts: PARTS,
          };
          //console.log(newObj);
          //debugger
          StockDetails[Index] = newObj;

          $(".save").attr("id", "savestock");
          // $("#stockName").removeAttr("disabled");

          // //console.log(StockDetails)
          localStorage.setItem("stock", JSON.stringify(StockDetails));
          //  delete  newObj.parts
          table.row(Index).data(newObj).draw();
          $("#addStockModal").modal("hide");
          // location.reload(true);
          // $("#tableStocks").dataTable().clear().draw();
          // $("#tableStocks").dataTable().fnDestroy()
          // //console.log(StockDetails)
          // table.draw(true)
        } else {
          Swal.fire("Please enter at least 1 part");
        }
      }
    });
    $(document).on("click", ".deleteparts", function () {
      let indexofChildRow = $(this).data("val");
      // //alert(indexofChildRow)
      let indexofParent = $(this).data("parentrowid");
      if (STOCKS[indexofParent].parts.length == 1) {
        Swal.fire("Atleast 1 Part Required");
      } else {
        // //alert(indexofParent)
        Swal.fire({
          title: "Do you want to Delete the Part?",
          showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Delete",
          denyButtonText: `Cancel`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // let indexofRow= table.row( parentRow ).data()
            // //alert(indexofRow)

            for (let i = 0; i < STOCKS.length; i++) {
              for (let j = 0; j < STOCKS[i].parts.length; j++) {
                if (STOCKS[i].parts.length == 1) {
                  // Swal.fire("Atleast 1 part required")
                  break;
                }
                if (j == indexofChildRow - 1 && i == indexofParent) {
                  STOCKS[i].parts.splice(indexofChildRow - 1, 1);
                  var tr = $(this).closest("tr");
                  tr.remove();
                  table.row(indexofParent).data(STOCKS[i]).draw();
                }
              }
            }
            localStorage.setItem("stock", JSON.stringify(STOCKS));

            // //console.log(STOCKS)
          }

          // else if (result.isDenied) {
          //   Swal.fire('Changes are not saved', '', 'info')
          // }
        });
      }
    });

    $(document).on('click','.Audit',function(){
      $("#AuditModal").modal("show")
    })

    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
      table.search(input.value).draw();
    });
  } else {
    window.location.href = "index.html";
  }
});
