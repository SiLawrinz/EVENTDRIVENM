$(document).ready(function () {
  const contentDiv = $('#content');

  // Initial content to display when the SPA loads
  loadContent(getCurrentPath());

  // Handle navigation links
  $(document).on('click', 'a', function (event) {
    // Prevent the default link behavior
    event.preventDefault();

    const target = $(this).attr('href').substr(1); // Remove the '#' symbol

    // Update the URL and content
    navigateTo(target);
  });

  // Function to update the URL and content
  function navigateTo(path) {
    // Use pushState to update the URL without triggering a page reload
    history.pushState(null, null, path);

    // Load content based on the path
    loadContent(path);
  }

  // Function to load content based on the path
  function loadContent(path) {
    contentDiv.fadeOut(200, function () {
      contentDiv.load(`views/${path}.html`, function () {
        contentDiv.fadeIn(200);
      });
    });
  }

  // Function to get the current path from the URL
  function getCurrentPath() {
    return location.pathname.replace('home'); // Remove leading and trailing slashes
  }

  // Example: handle back/forward buttons
  $(window).on('popstate', function () {
    // Load content based on the current URL
    loadContent(getCurrentPath('index.html'));
  });
});
