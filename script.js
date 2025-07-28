'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//btn scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // }); you can replace ll of these with a new function in the modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

////Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// }); /// THIS IS WHAT WHICH CAN BE DONE EASILY BY EVENT DELEGATING

///STEPSS::::
// 1.Add event listener to a common parent Element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///TABBED COMPONENT

// tabs.forEach(t => t.addEventListener('click', function (e) {}));
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  clicked.classList.add('operations__content--active');

  // tabs.forEach(t => t.classList.add('operations__tab--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');
    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});
//we can also use the bind method here
// bind method will create a copy of a function that is called on and set the this keyword to whatever we send
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky Nav
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function (e) {
//   //using scroll decrease the performance of the app
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// }); //  an alternative to do sticky navigatiion is using the Imtersectin observer API
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.Intersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObs = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObs.observe(header);
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.15],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
///End of the attempt
const allSections = document.querySelectorAll('.section ');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section-hidden');
});
//Lazy Loading Images
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgTargets.forEach(img => imgObserver.observe(img));

//slider
const btnLeft = document.querySelector('slider__btn--left');
const btnRight = document.querySelector('slider__btn--right');
let curSlide = 0;

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const maxSlide = slides.length;
slider.style.transform = 'scale(0.6) translateX(-800px)';
slider.style.overflow = 'visible';

btnRight.addEventListener('click', function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
});
///////////////////
//
// LECTURES
////////////////////////
//Selecting Elements
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);
// const header = document.querySelector('.header');
// // console.log(document.querySelectorAll('.section'));
// const allSections = document.querySelectorAll('.section');
// console.log(document.getElementById('section--1'));
// // console.log(document.getElementsByTagName('button'));
// const allBtns = document.getElementsByTagName('button');
// console.log(document.getElementsByClassName('btn'));

// ///Creating and Inserting Elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent='We provide Cookies'
// message.innerHTML =
//   'We provide Cookies <button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message);
// header.append(message);
// //before and after will also work similarly but add as the sibling element

// /////deleting Elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();

//     // message.parentElement.remove(message); //before remove
//   });

// /////styles
// message.style.backdropColor = '#37383d';
// // for height and width: use ComputedStyle
// console.log(getComputedStyle(message).height);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// console.log();
// console.log(message.style.height);

// // document.documentElement.style.setProperty('--color-primary', 'orangered');

// //Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// // not the in built but external property like designer are accessed by the getAttribute
// console.log(logo.getAttribute('designer'));
// console.log(logo.designer);
// logo.setAttribute('company', 'Bankist  ');
// console.log(logo.getAttribute('company'));
// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(logo.getAttribute('href'));
// // data Attributes
// console.log(logo.dataset.version);

// //Classes
// // logo.classList.add();
// // logo.classList.remove();
// // logo.classList.toggle();
// // logo.classList.contains();

// const h1 = document.querySelector('h1');
// // h1.addEventListener('mouseenter', function (e) {
// //   alert('greet');
// // });
// //can also be written as
// // h1.onmouseenter =
// //   ('mouseenter',
// //   function (e) {
// //     alert('greet');
// //   });

// const randomInt = (max, min) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomClr = () =>
//   `rgb(${randomInt(255, 0)},${randomInt(255, 0)},${randomInt(255, 0)})`;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('3rd');
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('2nd');
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('1st');
// });

// // document.querySelector('.nav__link').addEventListener('click', function (e) {
// //   this.style.backgroundColor = randomClr();
// //   console.log('3rd');
// // });
// // document.querySelector('.nav__links').addEventListener('click', function (e) {
// //   this.style.backgroundColor = randomClr();
// //   console.log('2nd');
// // },true);
// // document.querySelector('.nav').addEventListener(
// //   'click',
// //   function (e) {
// //     this.style.backgroundColor = randomClr();
// //     console.log('1st');
// //   },
// //   true
// // );

//DOM TRAVERSAL
//going downwards to the child
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'black';

// //going upwards to the parent
// // console.log(h1.parentNode);
// // console.log(h1.parentElement);
// // h1.closest('.header').style.background = 'grey';

// //going sideways to the sibling in js can just go to the direct sibling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// //to find all siblings we can move to parent and then fetch all their children
// console.log(h1.parentElement.children);

// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) {
//     e.style.transform = 'scale(0.5)';
//   }
// });
