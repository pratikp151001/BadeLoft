$(document).ready(function () {

    if (localStorage.getItem('LogedinUser') !== null) {

      
      
        $("#navigation").load("Navbar.html");
       //Display name in Navbar
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
   

    //Dashboard

  var dataSet = [
    ['ZK-08-X2P', '1', '0', "<a href='#' data-toggle='popover' title='Assigned to' data-content='Some content inside the popover' style='text-decoration: none; color:black'>1</a>", '0', '0'],
    ['BW-01-Q-M', '2', '0', "<a href='#' data-toggle='popover' title='Assigned to' data-content='Some content inside the popover' style='text-decoration: none; color:black'>3</a>", '0', '1'],
    ['BW-01-XL-G', '1', '1', "<a href='#' data-toggle='popover' title='Assigned to' data-content='Some content inside the popover' style='text-decoration: none; color:black'>2</a>", '2', '1'],
    ['BW-01-S-M', '1', '0', "<a href='#' data-toggle='popover' title='Assigned to' data-content='Some content inside the popover' style='text-decoration: none; color:black'>0</a>", '0', '0'],
  ];
    //PopOver
  $("#table_div").DataTable({
    data: dataSet,
    // "ordering": false,
    columnDefs: [
      { orderable: true, className: 'reorder', targets: 0 },
      { orderable: false, targets: '_all' }
  ],
    columns: [
        { title: 'Part Number' },
        { title: 'In Warehouse' },
        { title: 'Available' },
        { title: 'C100' },
        { title: 'C101' },
        { title: 'C102' },
    ],
  });

  $('[data-toggle="popover"]').popover({
    html:true,
    content: function() {
        return $('#popover-content').html();
      }
  });  

  // $('.sorting').removeClass('sorting')
  // document.getElementsByClassName("dataTables_length").innerHTML="Dashboard"
  
  

  // function options(){
  //   var options = {
  //     html: true,
  //     title: "Optional: HELLO(Will overide the default-the inline title)",
  //     //html element
  //     //content: $("#popover-content")
  //     content: $('[data-name="popover-content"]')
  //     //Doing below won't work. Shows title only
  //     //content: $("#popover-content").html()

  // }

  // }

  // var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  // var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  //   return new bootstrap.Popover(popoverTriggerEl,options)
  // })



    }
    else {
        window.location.href="index.html"
        } 
})  



// console.log(PartNumber);
// var check=true
// for(let i=0;i<PARTS.length;i++){
//   if(PARTS.partsnumber==PartNumber){
//     check=false
//     Swal.fire("Part Number Alredy Present")
//   }
// }
// if(check==false){
//   var obj = {
//     partsnumber: PartNumber,
//     Order: Ordered,
//     notes: Notes,
//   };

// }