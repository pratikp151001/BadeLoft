$(document).ready(function () {

  if (localStorage.getItem('LogedinUser') !== null) {
    $("#navigation").load("Navbar.html");
     //Display name in Navbar
  var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
 
  // Table Data
  // var data = [
  //   {
  //     name: "Tiger Nixon",
  //     position: "System Architect",
  //     salary: "$3,120",
  //     start_date: "2011/04/25",
  //     office: "Edinburgh",
  //     extn: "5421",
  //   },
  //   {
  //     name: "Garrett Winters",
  //     position: "Director",
  //     salary: "$5,300",
  //     start_date: "2011/07/25",
  //     office: "Edinburgh",
  //     extn: "8422",
  //   },
  // ];

  // $("#table_div1").DataTable({
  //   data: data,
  //   columns: [
  //     { data: "name" },
  //     { data: "position" },
  //     { data: "salary" },
  //     { data: "office" },
  //   ],
  // });

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


$(document).ready(function () {
  var table = $('#table_div1').DataTable({
      data:datasets,
      columns: [
          {
              className: 'dt-control',
              orderable: false,
              data: null,
              defaultContent: '',
          },
          { title: '' },
          { title: 'name' },
          { title: 'position' },
          { title: 'office' },
          { title: 'salary' },
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
});

  //DateRange Picker
  $("#birthday").daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format("YYYY"), 10),
    },
    function (start, end, label) {
      var years = moment().diff(start, "years");
      alert("You are " + years + " years old!");
    }
  );
  //Logout

  $("#addStock").click(function () {
    debugger;
    $("#addStockModal").modal("show");
  });
  $("#closemodal").click(function () {
    debugger;
    $("#addStockModal").modal("hide");
  });

  $('.sorting').removeClass('sorting')
  // $('.sorting_asc').removeClass('sorting_asc')

} else {
window.location.href="index.html"
}
 
});
