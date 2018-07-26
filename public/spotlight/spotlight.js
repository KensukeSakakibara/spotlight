$(function(){
  $("[spotlight]").each(function(index, element){
    $(element).on("click", function(){
      var href = $(this).attr("href");

      var newDiv = $("<div>");
      newDiv.addClass("spotlight-box");

      var newImage = $("<img>").attr("src", href);
      newImage.addClass("spotlight-image");
      var newImageHtml = newImage.prop("outerHTML");

      newDiv.append(newImageHtml);
      var newDivHtml = newDiv.prop("outerHTML");

      $(".spotlight-box").remove();
      $("body").append(newDivHtml);

      newDiv.ready(function(){
        $(".spotlight-box").css("opacity", "1");
        $(".spotlight-image").css("transform", "translate(-50%, -50%) scale(1)");
      });

      return false;
    });

    // preload images
    var href = $(element).attr("href");
    $("<img>").attr("src", href);
  });

  $(document).on("click", ".spotlight-box", function(){
    $(this).remove();
  });
  
  $(document).on("click", ".spotlight-image", function(){
    return false;
  });
});
