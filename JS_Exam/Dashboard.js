$(document).ready(function () {
  if (localStorage.getItem("LogedinUser") !== null) {
    //Display name in Navbar
    $("#navigation").load("Navbar.html");
    const input = document.querySelector('input[type="search"]');
    input.addEventListener("search", () => {
      table.search(input.value).draw();
    });
    var dataSet = [
      [
        "ZK-08-X2P",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>1</a>",
        "0",
        "0",
      ],
      [
        "BW-01-Q-M",
        "2",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>3</a>",
        "0",
        "1",
      ],
      [
        "BW-01-XL-G",
        "1",
        "1",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>2</a>",
        "2",
        "1",
      ],
      [
        "BW-01-S-M",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>0</a>",
        "0",
        "0",
      ],
      [
        "ZK-08-X2P",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>1</a>",
        "0",
        "0",
      ],
      [
        "BW-01-Q-M",
        "2",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>3</a>",
        "0",
        "1",
      ],
      [
        "BW-01-XL-G",
        "1",
        "1",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>2</a>",
        "2",
        "1",
      ],
      [
        "BW-01-S-M",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>0</a>",
        "0",
        "0",
      ],
      [
        "ZK-08-X2P",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>1</a>",
        "0",
        "0",
      ],
      [
        "BW-01-Q-M",
        "2",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>3</a>",
        "0",
        "1",
      ],
      [
        "BW-01-XL-G",
        "1",
        "1",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>2</a>",
        "2",
        "1",
      ],
      [
        "BW-01-S-M",
        "1",
        "0",
        "<a href='#' data-toggle='popover'  data-content='Some content inside the popover' style='text-decoration: none; color:#3399FF'>0</a>",
        "0",
        "0",
      ],
      ["Stock Location", "", "", "On Water", "On Water", "In Production"],
      ["ETA Date", "", "", "10/08/2021", "10/08/2021", "10/08/2021"],
    ];
    var StockLocation = $.fn.dataTable.absoluteOrder([
      { value: "Stock Location", position: "top" },
      { value: "ETA Date", position: "top" },
    ]);
    $("#tableDashboard").DataTable({
      data: dataSet,

      language: {
        info: "Items _START_ to _END_ of _TOTAL_ total",
        paginate: {
          next: '<i class="bi bi-chevron-right"></i>',
          previous: '<i class="bi bi-chevron-left"></i>',
        },
      },
      // topSplit:2,
      // "ordering": false,
      // columnDefs:[
      //   {
      //     targets:0,type:StockLocation
      //   }
      // ],
      columnDefs: [
        { targets: 0, type: StockLocation },
        // { "targets": -1, "type": ETADATE,"orderable": true },
        { orderable: true, className: "reorder", targets: 0 },
        { orderable: false, targets: "_all" },
        {
          className: "dt-center",
          targets: [1, 2, 3, 4, 5],
        },
        {
          className: "dt-left",
          targets: [0],
        },
        {
          width: "30%",
          targets: [0],
        },
      ],
      columns: [
        { title: "Part Number" },
        { title: "In Warehouse" },
        { title: "Available" },
        { title: "C100" },
        { title: "C101" },
        { title: "C102" },
      ],
    });
    var table = $("#tableDashboard").DataTable();

    // #myInput is a <input type="text"> element
    $("#searchDashbord").on("keyup", function () {
      table.search(this.value).draw();
    });

    $('[data-toggle="popover"]').popover({
      html: true,
      content: function () {
        return $("#popover-content").html();
      },
    });
    // $(document).on('click','.paginate_button',function(){
    //   if($(this).hasClass('current')){
    //     $(this).css('color','white');
    //   }
    // });
    //  $(document).on('clicked','#ClosePopover',function(){
    //     alert("CLicked")
    //     $("#popover-content").hide();
    //   })
  } else {
    window.location.href = "index.html";
  }
});
