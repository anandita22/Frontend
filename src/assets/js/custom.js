window.toggleMatchingScreen = function (open) {
  const matchingScreenWrapper = document.querySelector(
    ".matchingScreenWrapper"
  );
  if (matchingScreenWrapper) {
    if (open === true) {
      matchingScreenWrapper.classList.add("showLeaderboard");
    } else if (open === false) {
      matchingScreenWrapper.classList.remove("showLeaderboard");
    }
  }
};

window.exitScreen = function () {
  try {
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const toggleMatchingScreen = window.toggleMatchingScreen;
export const exitScreen = window.exitScreen;
