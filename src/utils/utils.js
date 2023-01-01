import JWTDecode from "jwt-decode";
import Moment from "moment";

export const parseErrorMsg = (errors) => {
  const msgs = [];

  errors.forEach((err) => {
    if (err.type === "unique") {
      msgs.push(`${err.path} already taken!`);
    } else if (err.type === "required") {
      msgs.push(`${err.path} is required!`);
    }
  });

  return msgs;
};

export const checkLogin = () => {
  try {
    const token = localStorage.getItem("token");
    if (token && token.length > 50) {
      const tokenData = JWTDecode(token);
      return {
        success: true,
        data: tokenData,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

export const formatDate = (timestamp) => {
  return Moment(timestamp).format("ddd, MMM DD, YYYY hh:mm A");
};

export const getTournamentPrizeAmount = function (index, prizes) {
  let amount = "--";
  if (prizes) {
    const rank = index + 1;
    if (rank === 1) {
      amount = prizes[0].prize;
    } else if (rank === 2) {
      amount = prizes[1].prize;
    } else if (rank === 3) {
      amount = prizes[2].prize;
    }

    const customPrizes = prizes.slice(3);
    for (let i = 0; i < customPrizes.length; i++) {
      const [startingRank, endingRank] = customPrizes[i].position.split("-");
      if (rank >= parseInt(startingRank) && rank <= parseInt(endingRank)) {
        amount = customPrizes[i].prize;
        break;
      }
    }
  }
  return amount;
};

export const getTournamentTotalAmount = function (prizes) {
  let totalPrize = 0;
  if (prizes) {
    for (let prize in prizes) {
      if (
        prizes[prize].position === "1" ||
        prizes[prize].position === "2" ||
        prizes[prize].position === "3"
      ) {
        totalPrize += prizes[prize].prize;
      } else {
        const [startPosition, endPosition] = prizes[prize].position.split("-");
        const users = parseInt(endPosition) - parseInt(startPosition) + 1;
        totalPrize += users * prizes[prize].prize;
      }
    }
  }

  return totalPrize;
};

export const sendEventToChild = (eventName, data) => {
  const iFrame = document.querySelector("#gameIframe");
  if (iFrame) {
    const event = {
      action: eventName,
      data,
    };
    iFrame.contentWindow.postMessage(event, "*");
  }
};

export const limitText = (name, totalChar) => {
  if (name) {
    let newStr = name;
    if (newStr && newStr.length > totalChar) {
      return `${newStr.substring(0, totalChar)}..`;
    } else {
      return newStr;
    }
  } else {
    return "";
  }
};

export const getTotalPrizeUsers = (prizes) => {
  try {
    if (prizes && prizes.length) {
      const lastItem = prizes[prizes.length - 1];
      if (lastItem) {
        const arr = lastItem.position.split("-");
        if (arr && arr.length === 2) {
          return parseInt(arr[1]);
        } else {
          return 3;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  } catch (err) {
    console.log(err);
    return 0;
  }
};
