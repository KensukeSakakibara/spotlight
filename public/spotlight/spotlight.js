$(function(){
  $("[spotlight]").each(function(index, element){
    // preload images
    var href = $(element).attr("href");
    $("<img>").attr("src", href);

    // on click
    $(element).on("click", function(){
      var href = $(this).attr("href");
      var group = $(this).attr("spotlight");
      var htmlSrc = $(this).attr("spotlight-src");
      var title = $(this).attr("spotlight-title");

      if (htmlSrc) {
        displayHtml(htmlSrc, group, title);
      } else if (href) {
        displayImage(href, group, title);
      }
      
      return false;
    });
  });
});

function displayImage(href, group, title) {
  // base box
  var newBoxDiv = $("<div>");
  newBoxDiv.addClass("spotlight-box");
  newBoxDiv.attr("spotlight-group", group);

  // image
  var newImageBoxDiv = $("<div>");
  newImageBoxDiv.addClass("spotlight-image-box");
  var newImage = $("<img>").attr("src", href);
  newImage.addClass("spotlight-image");
  newImageBoxDiv.append(newImage.prop("outerHTML"));

  // title
  var newTitleBoxP = $("<p>");
  newTitleBoxP.addClass("spotlight-title");
  newTitleBoxP.html(title);
  newImageBoxDiv.append(newTitleBoxP.prop("outerHTML"));

  // left arrow
  var newLeftBoxDiv = $("<div>");
  newLeftBoxDiv.addClass("spotlight-left-box");
  var newLeftArrow = $("<img>").attr("src", "spotlight/img/left.png");
  newLeftArrow.addClass("spotlight-arrow-left");
  newLeftBoxDiv.append(newLeftArrow.prop("outerHTML"));
  newImageBoxDiv.append(newLeftBoxDiv.prop("outerHTML"));

  // right arrow
  var newRightBoxDiv = $("<div>");
  newRightBoxDiv.addClass("spotlight-right-box");
  var newRightArrow = $("<img>").attr("src", "spotlight/img/right.png");
  newRightArrow.addClass("spotlight-arrow-right");
  newRightBoxDiv.append(newRightArrow.prop("outerHTML"));
  newImageBoxDiv.append(newRightBoxDiv.prop("outerHTML"));

  // add parts to base box
  newBoxDiv.append(newImageBoxDiv.prop("outerHTML"));

  // display spotlight
  $(".spotlight-box").remove();
  $("body").append(newBoxDiv.prop("outerHTML"));

  newBoxDiv.ready(function(){
    $(".spotlight-box").css("opacity", "1");
    $(".spotlight-image").css("transform", "scale(1)");
    $(".spotlight-image").css("opacity", "1");
    $(".spotlight-title").css("opacity", "1");
  });
}

function displayHtml(htmlSrc, group, title) {
  // base box
  var newBoxDiv = $("<div>");
  newBoxDiv.addClass("spotlight-box");
  newBoxDiv.attr("spotlight-group", group);
  
  // data box
  var dataHtml = $('[spotlight-data="' + htmlSrc + '"]').html();
  var newDataBoxDiv = $("<div>");
  newDataBoxDiv.addClass("spotlight-data-box");
  newDataBoxDiv.append(dataHtml);
  newBoxDiv.append(newDataBoxDiv.prop("outerHTML"));

  // display spotlight
  $(".spotlight-box").remove();
  $("body").append(newBoxDiv.prop("outerHTML"));

  newBoxDiv.ready(function(){
    $(".spotlight-box").css("opacity", "1");
  });
}

$(document).on("click", ".spotlight-left-box", function(){
  var group = $(".spotlight-box").attr("spotlight-group");
  var currentSrc = $(".spotlight-image").attr("src");
  
  var prevSrc = '';
  var prevTitle = '';
  $('[spotlight="' + group + '"]').each(function(index, element){
    var href = $(element).attr("href");
    var title = $(element).attr("spotlight-title");
    if (prevSrc == '') {
      prevSrc = href;
      prevTitle = title;
    }
    if (href == currentSrc) {
      return false;
    }
    prevSrc = href;
    prevTitle = title;
  });

  changeImage(prevSrc, prevTitle);

  return false;
});

$(document).on("click", ".spotlight-right-box", function(){
  var group = $(".spotlight-box").attr("spotlight-group");
  var currentSrc = $(".spotlight-image").attr("src");
  
  var nextFlg = false;
  var nextSrc = '';
  var nextTitle = '';
  $('[spotlight="' + group + '"]').each(function(index, element){
    nextSrc = $(element).attr("href");
    nextTitle = $(element).attr("spotlight-title");
    if (nextFlg) {
      return false;
    }
    if (nextSrc == currentSrc) {
      nextFlg = true;
    }
  });

  changeImage(nextSrc, nextTitle);

  return false;
});

function changeImage(href, title) {
  // remove
  $(".spotlight-image").remove();
  $(".spotlight-title").remove();

  // prepend title
  var newTitleBoxP = $("<p>");
  newTitleBoxP.addClass("spotlight-title");
  newTitleBoxP.html(title);
  $(".spotlight-image-box").prepend(newTitleBoxP.prop("outerHTML"));

  // prepend image
  var newImage = $("<img>").attr("src", href);
  newImage.addClass("spotlight-image");
  $(".spotlight-image-box").prepend(newImage.prop("outerHTML"));

  $(".spotlight-image").ready(function(){
    $(".spotlight-image").css("transform", "scale(1)");
    $(".spotlight-image").css("opacity", "1");
    $(".spotlight-title").css("opacity", "1");
  });
}

$(document).on("click", ".spotlight-box", function(){
  $(this).remove();
});

$(document).on("click", ".spotlight-image", function(){
  return false;
});
