$("#_table").find("tr").click(function() { 
    $("#_table").find("tr").removeClass("select"); 
    $(this).addClass("select");
}) 