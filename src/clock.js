const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

const getDate = () => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const sec = date.getSeconds();
  clockTitle.innerText = `${hours}:${minutes}:${sec < 10 ? `0${sec}` : sec}`;
};

const Clock = () => {
  getDate();
  setInterval(getDate, 1000);
};

Clock();

// setInterval(fnc,첫 번째 프롭스를 실행하고 싶은 시간) -> 중요
