import constants from "../../config/constants";

// const adURL = constants.AFG_PUB_URL;

const minAdvTime = 5;
const timer = (() => {
  let timeCount = minAdvTime + 5;
  const startTimer = () => {
    setInterval(() => {
      timeCount++;
    }, 1000);
  };
  const getTimeCount = () => {
    return timeCount;
  };
  const resetTimeCount = () => {
    timeCount = 0;
  };

  startTimer();
  return {
    getTimeCount,
    resetTimeCount,
  };
})();
function loadAdText() {
  const adLoadingWrapper = document.querySelector(".adLoadingWrapper");
  if (adLoadingWrapper) {
    adLoadingWrapper.style.display = "block";
  }
}
function removeLoading() {
  const adLoadingWrapper = document.querySelector(".adLoadingWrapper");
  if (adLoadingWrapper) {
    adLoadingWrapper.style.display = "none";
  }
}
var adsManager = undefined;
var adsLoader = undefined;
var adDisplayContainer = undefined;
var videoContent = undefined;
var adsInitialized = undefined;
var adContainer = undefined;
var autoplayAllowed = undefined;
var autoplayRequiresMuted = undefined;
var adHolder = undefined;
var onContentResumeRequestedCalled = false;
function resetVariables() {
  adsManager = undefined;
  adsLoader = undefined;
  adDisplayContainer = undefined;
  videoContent = undefined;
  adsInitialized = undefined;
  adContainer = undefined;
  autoplayAllowed = undefined;
  autoplayRequiresMuted = undefined;
  adHolder = undefined;
  onContentResumeRequestedCalled = false;
}
function startGamePlay() {
  try {
    let adContainer = document.getElementById("adContainer");
    adContainer.style.zIndex = -100;
  } catch (err) {
    console.log(err);
  }
}
function showTimer() {
  try {
    let skipTimer = document.querySelector("#timerMade");
    skipTimer.style.zIndex = 101;
  } catch (err) {
    console.log(err);
  }
}
function setupUI() {
  try {
    let adContainer = document.getElementById("adContainer");
    adContainer.style.zIndex = 100;
  } catch (err) {
    console.log(err);
  }
}
function displayAd(tagUrl) {
  if (timer.getTimeCount() > minAdvTime) {
    let url = tagUrl;
    if (url) {
      loadAdText();
      videoContent = document.getElementById("contentElement");
      adContainer = document.getElementById("adContainer");
      adHolder = document.getElementById("adHolder");
      setupUI();
      setUpIMA();
      requestAdsAFG(url);

      timer.resetTimeCount();
    }
  } else {
    console.log(
      `${minAdvTime}s is not passed yet..! Left: ${
        minAdvTime - timer.getTimeCount()
      }s`
    );
  }
}
function setUpIMA() {
  adDisplayContainer = new window.google.ima.AdDisplayContainer(
    adContainer,
    videoContent
  );
  adsLoader = new window.google.ima.AdsLoader(adDisplayContainer, videoContent);
  adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
  adsLoader.addEventListener(
    window.google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  );
  adsLoader.addEventListener(
    window.google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false
  );
  window.addEventListener("resize", onWindowResize);
  videoContent.onended = contentEndedListener;
}
function contentEndedListener() {
  videoContent.onended = null;
  if (adsLoader) {
    adsLoader.contentComplete();
  }
}
function requestAdsAFG(url) {
  if (adsManager) {
    console.log("adsManager is active. Destroying...");
    adsManager.destroy();
    adsLoader.contentComplete();
  }
  var adsRequest = new window.google.ima.AdsRequest();
  adsRequest.adTagUrl = url;
  var x = window,
    y = document,
    c = y.documentElement,
    e = y.getElementsByTagName("body")[0],
    d = x.innerWidth || c.clientWidth || e.clientWidth,
    a = x.innerHeight || c.clientHeight || e.clientHeight;
  adsRequest.linearAdSlotWidth = d;
  adsRequest.linearAdSlotHeight = a < 360 ? 360 : a;
  adsRequest.nonLinearAdSlotWidth = d;
  adsRequest.nonLinearAdSlotHeight = a < 360 ? 360 : a;
  adsRequest.forceNonLinearFullSlot = true;
  adsRequest.setAdWillAutoPlay(autoplayAllowed);
  adsRequest.setAdWillPlayMuted(autoplayRequiresMuted);
  adsLoader.requestAds(adsRequest);
}
function onWindowResize() {
  var b = window;
  var a = document,
    c = a.documentElement,
    d = a.getElementsByTagName("body")[0];
  const w = b.innerWidth || c.clientWidth || d.clientWidth;
  const h = b.innerHeight || c.clientHeight || d.clientHeight;
  adsManager &&
    adsManager.resize(w, h < 360 ? 360 : h, window.google.ima.ViewMode.NORMAL);
}
function playAds() {
  try {
    if (!adsInitialized) {
      adDisplayContainer.initialize();
      adsInitialized = true;
    }
    var b = window;
    var a = document,
      c = a.documentElement,
      d = a.getElementsByTagName("body")[0];
    const w = b.innerWidth || c.clientWidth || d.clientWidth;
    const h = b.innerHeight || c.clientHeight || d.clientHeight;
    adsManager.init(w, h < 360 ? 360 : h, window.google.ima.ViewMode.NORMAL);
    adsManager.start();
  } catch (adError) {
    videoContent.play();
  }
}
function onAdsManagerLoaded(adsManagerLoadedEvent) {
  var adsRenderingSettings = new window.google.ima.AdsRenderingSettings();
  adsRenderingSettings.enablePreloading = true;
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  adsManager = adsManagerLoadedEvent.getAdsManager(
    videoContent,
    adsRenderingSettings
  );
  adsManager.addEventListener(
    window.google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  );
  adsManager.addEventListener(window.google.ima.AdEvent.Type.SKIPPED, onAdSkip);
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.COMPLETE,
    onAdComplete
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.USER_CLOSE,
    onUserClose
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.CLICK,
    onContentResumeRequested
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.STARTED,
    onAdStart
  );
  adsManager.addEventListener(
    window.google.ima.AdEvent.Type.LOADED,
    onAdLoaded
  );
  playAds();
}
function onUserClose(ad) {
  //   c2_callFunction("unmuteSound");
  removeAdElements();
  startGamePlay();
  resetVariables();
  removeLoading();
}
function onAdSkip(ad) {
  //   c2_callFunction("unmuteSound");
  //   c2_callFunction("gratifyUser");
  removeAdElements();
  startGamePlay();
  resetVariables();
  removeLoading();
}
function onAdComplete(ad) {
  //   c2_callFunction("unmuteSound");
  //   c2_callFunction("gratifyUser");
  removeAdElements();
  startGamePlay();
  resetVariables();
  removeLoading();
}
function onAdStart(ad) {
  removeLoading();
  //   c2_callFunction("muteSound");
  var adObj = ad.getAd();
  if (!adObj.isLinear()) {
    alignAds(adObj);
  }
}
function onAdLoaded(adEvent) {
  removeLoading();
  var ad = adEvent.getAd();
  if (!ad.isLinear()) {
    console.log("Ad is non-linear...");
    videoContent.play();
  }
}
function onAdError(adErrorEvent) {
  console.log(adErrorEvent.getError());
  adsManager && adsManager.destroy();
  //   c2_callFunction("unmuteSound");
  removeAdElements();
  startGamePlay();
  resetVariables();
  removeLoading();
}
function onContentPauseRequested() {
  videoContent.pause();
  videoContent.onended = null;
}
function onContentResumeRequested() {
  if (!onContentResumeRequestedCalled) {
    onContentResumeRequestedCalled = true;
    videoContent.play();
    videoContent.onended = contentEndedListener;
    // c2_callFunction("unmuteSound");
    removeAdElements();
    startGamePlay();
    resetVariables();
    removeLoading();
  }
}
function removeAdElements() {
  try {
    let arr = Array.from(document.querySelector("#adContainer").childNodes);
    arr.forEach((div) => {
      if (div) {
        div.remove();
      }
    });
    const skipBtnWrapper = document.querySelector(".skipBtnWrapper");
    if (skipBtnWrapper) {
      skipBtnWrapper.remove();
    }
  } catch (err) {
    console.log(err);
  }
}
function createFakeTimer() {
  var seconds = 10;
  var second = 1;
  const divTimer = document.createElement("div");
  divTimer.className = "skipBtnWrapper";
  divTimer.innerHTML = fakeTimer();
  adHolder.appendChild(divTimer);
  showTimer();
  var timer = document.getElementById("counterMade");
  var skipAdDiv = document.getElementById("skipAdDiv");
  var interval = setInterval(() => {
    if (timer) {
      timer.innerHTML = `Ad will close in: ` + (seconds - second) + `s`;
    }
    if (skipAdDiv && second === 5) {
      skipAdDiv.style.opacity = "1";
    }
    if (second >= seconds) {
      //   c2_callFunction("unmuteSound");
      closeAdBySkip();
      startGamePlay();
      resetVariables();
      clearInterval(interval);
    }
    second++;
  }, 1000);
  var skipAdButton = document.getElementById("skipAdButton");
  const closeAdBySkip = () => {
    console.log("skipAdButton clicked..!");
    skipAdButton && skipAdButton.removeEventListener("click", closeAdBySkip);
    // c2_callFunction("unmuteSound");
    removeAdElements();
    resetVariables();
    clearInterval(interval);
    startGamePlay();
  };
  skipAdButton && skipAdButton.addEventListener("click", closeAdBySkip);
}
function alignAds(adObj) {
  createFakeTimer();
  let free_width = adObj.getWidth(),
    free_height = adObj.getHeight();
  var width, height;
  var b = window;
  var a = document,
    c = a.documentElement,
    d = a.getElementsByTagName("body")[0];
  width = b.innerWidth || c.clientWidth || d.clientWidth;
  height = b.innerHeight || c.clientHeight || d.clientHeight;
  var x =
    free_width / width > free_height / height
      ? free_width / width
      : free_height / height;
  x = 1 < x ? Math.round(100 * x) : 100;
  adContainer.childNodes[0]["style"].margin = "auto";
  adContainer.childNodes[0]["style"].width = x + "%";
  adContainer.childNodes[0]["style"].height = x + "%";
  for (var e = adContainer.childNodes[0].childNodes.length, f = 0; f < e; f++) {
    adContainer.childNodes[0].childNodes[f]["style"].margin = "auto";
    adContainer.childNodes[0].childNodes[f]["style"].width = x + "%";
    adContainer.childNodes[0].childNodes[f]["style"].height = x + "%";
  }
}

const fakeTimer = () => {
  return `<div id= "timerMade" style="position:absolute;width:100%; bottom: 10px; text-align:center;color:white;">
            <div id="counterMade"></div>
        </div>
        <div class="videoAdUiSkipContainer" id="skipAdDiv" style="opacity:0;-webkit-tap-highlight-color: rgba(0,0,0,0);bottom: 22px;cursor: pointer;padding: 15px 0 15px 15px;pointer-events: auto;position: absolute;right: 0;z-index: 1000;">
        <button class="videoAdUiSkipButton" id="skipAdButton" style="line-height: normal;min-width: 0;padding: 7px 6px 7px 10px;width: auto;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                background: rgba(0,0,0,0.8);
                border: 1px solid rgba(255,255,255,0.5);
                border-right: 0;
                box-sizing: content-box;
                color: #fff;
                cursor: pointer;
                direction: ltr;
                font-size: 1.8rem;
                text-align: center;">
                <div class="videoAdUiSkipButtonExperimentalText" style="font-size: 1.8rem;display: inline-block;vertical-align: middle;width: initial;">Skip Ad</div>
                <div class="videoAdUiExperimentalSkipIcon" style="height: 24px;
                background-repeat: no-repeat;
                display: inline-block;
                margin-left: 2px;
                vertical-align: middle;
                width: 24px;"></div>
                </button>
                </div>`;
};

export default displayAd;
