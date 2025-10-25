import{a as w,S,i as n}from"./assets/vendor-xwsNXkQR.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const R="52799161-b762ef396431272d847d94f09",q="https://pixabay.com/api/";async function m(s,o=1){try{return await w.get(q,{params:{key:R,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:16}})}catch(e){throw e}}const g=document.querySelector(".gallery"),h=document.querySelector(".loader"),y=document.querySelector(".loadMore"),E=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"});function v(s){const o=s.map(e=>`
      <li>
        <a href="${e.largeImageURL}" >
          <img src="${e.webformatURL}" alt="${e.tags}" />
        </a>
        <div class="image-info">
  <div class="stat">
    <span>Likes</span>
    <strong>${e.likes}</strong>
  </div>
  <div class="stat">
    <span>Comments</span>
    <strong>${e.comments}</strong>
  </div>
  <div class="stat">
    <span>Views</span>
    <strong>${e.views}</strong>
  </div>
  <div class="stat">
    <span>Downloads</span>
    <strong>${e.downloads}</strong>
  </div>
</div>
    </li>
    `).join("");g.insertAdjacentHTML("beforeend",o),E.refresh()}function M(){g.innerHTML=""}function L(){h.classList.add("is-visible")}function d(){h.classList.remove("is-visible")}function P(){y.classList.add("is-visible")}function u(){y.classList.remove("is-visible")}const l=document.querySelector(".form"),O=document.querySelector(".loadMore");let p="",a=1;const b=16;let f=0;l.addEventListener("submit",async function(s){s.preventDefault();const o=s.target.elements["search-text"].value.trim();if(o==="")return d(),n.error({title:"Error",message:"You entered an empty string",position:"topRight",timeout:3e3}),l.reset();p=o,a=1,M(),L(),u();try{const e=await m(p,a),i=e.data.hits;if(f=e.data.totalHits,i.length===0)throw new Error("NO RESULTS");v(i),a*b>=f?(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3})):P()}catch(e){e.message==="NO RESULTS"?n.error({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:3e3}):n.error({title:"Error",message:"An unexpected error occurred. Please try again later.",position:"topRight",timeout:3e3})}finally{d(),l.reset()}});O.addEventListener("click",async()=>{a+=1,L();try{const o=(await m(p,a)).data.hits;v(o);const e=document.querySelector(".gallery li");if(e){const i=e.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}a*b>=f&&(u(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:3e3}))}catch{n.error({title:"Error",message:"Failed to load more images.",position:"topRight",timeout:3e3})}finally{d()}});
//# sourceMappingURL=index.js.map
