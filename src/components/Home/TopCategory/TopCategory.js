import React from "react";
import { Link } from "react-router-dom";
import "./TopCategory.css";

import quizeMasterLogo from "../../../assets/images/quizmaster_icon.png";
import nonStopLetterLogo from "../../../assets/images/nonstop4letter_icon.png";
import numberMazeLogo from "../../../assets/images/numbermaze_icon.png";
import quickMathsLogo from "../../../assets/images/quickmath_icon.png";

const TopCategory = (props) => {
  return (
    <div className="TopCategory pt-4">
      <div className="container-fluid py-lg-5 py-3">
        <div className="row align-items-center">
          <div className="col px-0 px-sm-3 text-center">
            <Link to="/play/quiz-master">
              <div className="TopCategorySingle quizeMasterLogoWrapper d-inline-block position-relative">
                <div className="TopCategorySingleChild position-absolute text-center">
                  <img
                    src={quizeMasterLogo}
                    className="TopCategoryLogo TopCategoryLogoQuize mb-2"
                    alt="Top Category 1"
                  ></img>
                  <span className="d-block text-white categoryName">
                    Quiz Master
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col px-0 px-sm-3 text-center">
            <Link to="/play/nonstop-4-letter">
              <div className="TopCategorySingle nonStopLetterLogoWrapper d-inline-block position-relative">
                <div className="TopCategorySingleChild position-absolute text-center">
                  <img
                    src={nonStopLetterLogo}
                    className="TopCategoryLogo mb-2"
                    alt="Top Category 1"
                  ></img>
                  <span className="d-block text-white categoryName">
                    Nonstop 4 Letter
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col px-0 px-sm-3 text-center">
            <Link to="/play/number-maze">
              <div className="TopCategorySingle numberMazeLogoWrapper d-inline-block position-relative">
                <div className="TopCategorySingleChild position-absolute text-center">
                  <img
                    src={numberMazeLogo}
                    className="TopCategoryLogo mb-2"
                    alt="Top Category 1"
                  ></img>
                  <span className="d-block text-white categoryName">
                    Number Maze
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="col px-0 px-sm-3 text-center">
            <Link to="/play/quick-math">
              <div className="TopCategorySingle quickMathsLogoWrapper d-inline-block position-relative">
                <div className="TopCategorySingleChild position-absolute text-center">
                  <img
                    src={quickMathsLogo}
                    className="TopCategoryLogo mb-2"
                    alt="Top Category 1"
                  ></img>
                  <span className="d-block text-white categoryName">
                    Quick Math
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategory;
