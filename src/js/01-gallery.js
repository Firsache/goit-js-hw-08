// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

function createImageMarkUp(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <a class="gallery__item" href="${original}">
                <img loading="lazy"
                class="gallery__image lazyload"
                data-src="${preview}" 
                alt="${description}" />
            </a>
        `;
    })
    .join('');
}
function renderImageMarkUp(items) {
  galleryEl.innerHTML = createImageMarkUp(items);
}
renderImageMarkUp(galleryItems);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

galleryEl.addEventListener('click', onGalleryItemClickModalOpen);

function onGalleryItemClickModalOpen(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  lightbox.on(show.simplelightbox);

  document.addEventListener('keydown', evt => {
    if (evt.code === 'Escape') {
      close.simplelightbox;
    }
  });
}

const addSrcAttributeToIm = () => {
  const galleryImgEls = document.querySelectorAll('.gallery__image');

  galleryImgEls.forEach(elem => {
    elem.src = elem.dataset.src;
  });
};

const createLazySizesScript = () => {
  const script = document.createElement('.script');

  script.src =
    'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  return script;
};

if ('loading' in HTMLImageElement.prototype) {
  addSrcAttributeToIm();
} else {
  document.body.append(createLazySizesScript());
}
