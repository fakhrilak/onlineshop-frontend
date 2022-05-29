import React from "react";
import './Menubar.css'
import wifiLine from "../../img/wifi-line.png";
import faq from "../../img/faq.png";
import onlineChat from "../../img/online-chat.png";
import weight from "../../img/weight.png";
import temperature from "../../img/temperature.png";

const Menubar = () => {
  return (
    <div>
      <div className="menubar">
        <div className="background_icon">
          <div>
            <img className="icon" src={wifiLine} />
          </div>
        </div>

        <div className="background_icon">
          <div>
            <img className="icon" src={faq} />
          </div>
        </div>

        <div className="background_icon">
          <div>
            <img className="icon" src={onlineChat} />
          </div>
        </div>

        <div className="background_icon">
          <div>
            <img className="icon" src={weight} />
          </div>
        </div>

        <div className="background_icon">
          <div>
            <img className="icon" src={temperature} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menubar;
