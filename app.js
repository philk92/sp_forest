const form = document.querySelector("#searchForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = document.getElementById("searchInput").value;
  if (inputVal.indexOf("ddg:") === 0) {
    window.location.href = `https://www.duckduckgo.com/?q=${inputVal.slice(4)}`;
  } else if (inputVal.indexOf("yt:") === 0) {
    window.location.href = `https://www.youtube.com/results?search_query=${inputVal.slice(3)}`;
  } else if (inputVal.indexOf("gh:") === 0) {
    window.location.href = `https://github.com/search?q=${inputVal.slice(3)}`;
  } else {
    window.location.href = `https://www.google.com/search?q=${inputVal}`;
  }
});
