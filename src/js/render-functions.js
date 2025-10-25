import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery=document.querySelector(".gallery");
const loader=document.querySelector(".loader");
const loadMore=document.querySelector(".loadMore");

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

export function createGallery(images){
     const markup = images.map((image) => {
    return `
      <li>
        <a href="${image.largeImageURL}" >
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="image-info">
  <div class="stat">
    <span>Likes</span>
    <strong>${image.likes}</strong>
  </div>
  <div class="stat">
    <span>Comments</span>
    <strong>${image.comments}</strong>
  </div>
  <div class="stat">
    <span>Views</span>
    <strong>${image.views}</strong>
  </div>
  <div class="stat">
    <span>Downloads</span>
    <strong>${image.downloads}</strong>
  </div>
</div>
    </li>
    `;
  }).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};

export function clearGallery(){
    gallery.innerHTML="";
};

export function showLoader(){
    loader.classList.add("is-visible");
};

export function hideLoader(){
    loader.classList.remove("is-visible");
};

export function showLoadMoreButton(){
   loadMore.classList.add("is-visible");
};

export function hideLoadMoreButton(){
   loadMore.classList.remove("is-visible");
};

