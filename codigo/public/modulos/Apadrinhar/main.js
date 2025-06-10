$(function() {
  $("#sidebar-container").load("sidebar.html", function() {
    const currentPagePath = window.location.pathname;
    $("#menu a").each(function() {
      const linkHref = $(this).attr('href');
      if (currentPagePath.includes(linkHref)) {
        $(this).addClass("active");
      }
    });
  });
});