import React from "react";
import PropTypes from "prop-types";

import "./style.css";
import "../../static/icons.css";

export const BottomBar = () => (
  <div className="bottom-bar">
    <div className="bottom-bar__item">
      <i className="fire bottom-bar__item-icon" />

      <span className="bottom-bar__item-title">Мероприятия</span>
    </div>
    <div className="bottom-bar__item">
      <i className="fire bottom-bar__item-icon" />
      <span className="bottom-bar__item-title">Задания</span>
    </div>
    <div className="bottom-bar__item">
      <i className="fire bottom-bar__item-icon" />
      <span className="bottom-bar__item-title">Архив</span>
    </div>
  </div>
);

BottomBar.propTypes = {};
