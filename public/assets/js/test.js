// use js code below to help me create the required html code later, if I have time
// fully load DOM first, and then attach our handlers afterwards
$(function() {
  $(".change-devour").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");
    var newDevourState = {
      devoured: newDevour
    };
    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
  // class="create-form" in index.handlebars
  $(".create-form").on("submit", function(event) {
    // event refers to submit event, it seems
    event.preventDefault();
    var newBurger = {
      burger_name: $("#burge").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
      }).then(function() {
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});