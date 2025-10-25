import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form=document.querySelector(".form");
const loadMoreBtn = document.querySelector(".loadMore");

let query = '';
let page = 1;
const perPage = 16;
let totalHits = 0;

form.addEventListener("submit", async function(event){
event.preventDefault();
const inputValue = event.target.elements["search-text"].value.trim();
  if (inputValue === '') {
    hideLoader();
     iziToast.error({
      title: 'Error',
      message: "You entered an empty string",
      position: "topRight",
      timeout: 3000,
    });
    return form.reset();
  }
  query = inputValue;
  page = 1;
  clearGallery();
  showLoader();
  hideLoadMoreButton();

try{
   const response= await getImagesByQuery(query, page);
   const images=response.data.hits;
   totalHits = response.data.totalHits;

   if (images.length === 0) {
      throw new Error("NO RESULTS");
    }
    createGallery(images);
      if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        timeout: 3000,
      });
    }else{
      showLoadMoreButton();
    }
}catch(error){
 if (error.message === "NO RESULTS") {
        iziToast.error({
          title: "No Results",
          message: "Sorry, there are no images matching your search query. Please try again!",
          position: "topRight",
          timeout: 3000,
        });
      } else {
        iziToast.error({
          title: "Error",
          message: "An unexpected error occurred. Please try again later.",
          position: "topRight",
          timeout: 3000,
        });
      }
    }
finally{
    hideLoader();
    form.reset();
}

});

loadMoreBtn.addEventListener("click", async () => {
  page += 1;
  showLoader();

  try {
    const response = await getImagesByQuery(query, page);
    const images = response.data.hits;

    createGallery(images);
    const firstCard = document.querySelector('.gallery li');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (page * perPage >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
        timeout: 3000,
      });
    }

  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Failed to load more images.",
      position: "topRight",
      timeout: 3000,
    });
  } finally {
    hideLoader();
  }
});
