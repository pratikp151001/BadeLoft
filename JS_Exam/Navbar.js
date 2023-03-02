$(document).ready(function () {
    var logedinUser = JSON.parse(localStorage.getItem("LogedinUser"));
    $("#loginUseName").html(logedinUser[0].Name);
    $("#PrifleImage").attr("src", logedinUser[0].Picture);

    $("#logout").click(function () {
        debugger;
        localStorage.removeItem("LogedinUser");
        window.location.replace("index.html");
      });
      var pathname = (window.location.pathname.match(/[^\/]+$/)[0]);
      // alert(pathname)
      $('.nav-item a').each(function(){
        if ($(this).attr('href') == pathname){
        $(this).addClass('active');
        }
    });
    
})