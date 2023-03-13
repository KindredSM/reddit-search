function searchReddit(searchTerm, searchLimit, sortBy) {
  return fetch(
    `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then((res) => res.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err));
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loader = document.getElementById("loader");
const searchText = document.getElementById("search-text");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;

  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
    loader.style.display = "none";
    return;
  }

  loader.style.display = "flex";
  searchText.style.display = "none";
  searchReddit(searchTerm, searchLimit, sortBy).then((results) => {
    loader.style.display = "none";
    searchText.style.display = "flex";
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
      } else if (post.thumbnail && post.thumbnail != "self") {
        output += `<a href="${post.url}" target="_blank">
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

function truncateText(text, limit) {
  const shortened = text.indexOf("", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
