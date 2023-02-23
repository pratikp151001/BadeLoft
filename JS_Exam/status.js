$(document).ready(function(){



if (localStorage.getItem('LogedinUser') !== null) {
    $("#navigation").load("Navbar.html");
     //Display name in Navbar
  var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));

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
  var table = $('#table_status').DataTable({
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
});
}
else{
    window.location.href="index.html"
}
})

