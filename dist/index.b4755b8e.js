var e={search:function(e,t,a){return fetch(`http://www.reddit.com/search.json?q=${e}&sort=${a}&limit=${t}`).then((e=>e.json())).then((e=>e.data.children.map((e=>e.data)))).catch((e=>console.log(e)))}};const t=document.getElementById("search-form"),a=document.getElementById("search-input");t.addEventListener("submit",(t=>{t.preventDefault();const n=a.value,d=document.querySelector('input[name="sortby"]:checked').value,s=document.getElementById("limit").value;""===n&&showMessage("Please add a search term","alert-danger"),e.search(n,s,d).then((e=>{let t='<div class="card-columns">';e.forEach((e=>{t+=`<div class="card">\n          <div class="card-body">\n            <h5 class="card-title">${e.title}</h5>\n            <a class="subreddit-link" href="https://www.reddit.com/r/${e.subreddit}" target="_blank">\n              <p class="card-text">r/${e.subreddit}</p>\n            </a>`,e.is_video?t+=`<video width="100%" height="auto" controls>\n              <source src="${e.media.reddit_video.fallback_url}" type="video/mp4">\n            </video>`:t+=`<a href="${e.thumbnail}" target="_blank">\n              <img class="img-fluid img-thumbnail" src="${e.thumbnail}" alt="">\n            </a>`,t+=`<p class="card-text">${function(e,t){const a=e.indexOf("",t);return-1==a?e:e.substring(0,a)}(e.selftext,100)}</p>\n            <a href="${e.url}" target="_blank" class="btn btn-dark">Read Post</a> \n          </div>\n        </div>`})),t+="</div>",document.getElementById("results").innerHTML=t}))}));
//# sourceMappingURL=index.b4755b8e.js.map