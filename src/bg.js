// body를 가진다.

const body = document.querySelector("body");

const IMG_NUMBER = 6;

// /* API 작업 시 로딩 표시 */
// const handleImageLoad = () => {
//     console.log('finished loading')
// }

const paintImage = (imgNumber) => {
  const image = new Image();
  image.src = `img/${imgNumber + 1}.JPG`; // 랜덤 넘버가 0부터 시작해서
  image.classList.add("bgImage");
  body.appendChild(image); // 맨 앞으로 온다. ->
  // img.addEventListener('loadend',handleImageLoad)
};

// ceil(천장), floor(바닥)
const genRandom = () => {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  console.log(number);
  return number;
};

// 함수 안에다가 랜덤 숫자를 생성
const Bg = () => {
  const randomNumber = genRandom();
  paintImage(randomNumber);
};

Bg();
