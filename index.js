import reddit from "./redditapi";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }
  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = '<div class="card-columns">';

    results.forEach((post) => {
      output += `<div class="card">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <a class="subreddit-link" href="https://www.reddit.com/r/${post.subreddit}" target="_blank">
              <p class="card-text">r/${post.subreddit}</p>
            </a>`;
      if (post.is_video) {
        output += `<video width="100%" height="auto" controls>
              <source src="${post.media.reddit_video.fallback_url}" type="video/mp4">
            </video>`;
      } else {
        output += `<a href="${post.thumbnail}" target="_blank">
              <img class="img-fluid img-thumbnail" src="${post.thumbnail}" alt="">
            </a>`;
      }
      output += `<p class="card-text">${truncateText(post.selftext, 100)}</p>
            <a href="${
              post.url
            }" target="_blank" class="btn btn-dark">Read Post</a> 
          </div>
        </div>`;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });
});

// truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
