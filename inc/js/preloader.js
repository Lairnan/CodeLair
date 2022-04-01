var timeoutval = 1500;
var timeoutval2 = 200;

$(window).on("load", function () {
  window.setTimeout(function () {
    $("body").addClass("loaded_hiding");
    window.setTimeout(function () {
      $("body").addClass("loaded");
      $("body").removeClass("loaded_hiding");
      $("body").removeClass("fixed");
    }, timeoutval2);
  }, timeoutval + timeoutval2);
});