import React, { useState } from "react";
import ImgCover from "../../assets/img/background-top.png";
import ImageCartLogo from "../../assets/img/Dribbble-Light-Preview.png";

const MainImage = () => {
  const [checkUser, setCheckUser] = useState(false);
  return (
    <>
      <section class="background">
        <div class="main-catch">
        </div>
        <img src={ImgCover} alt="" />
        {checkUser && (
          <p class="img">
            <a href="/cart">
              <img src={ImageCartLogo} alt="" />
            </a>
          </p>
        )}
      </section>
    </>
  );
};

export default MainImage;
