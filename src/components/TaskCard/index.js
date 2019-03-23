import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Panel,
  PanelHeader,
  Epic,
  TabbarItem,
  HeaderButton,
  Tabbar,
  platform,
  IOS,
  Group,
  List,
  Cell
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";

const TaskCard = ({ el, goto }) => (
  <div
    data-goto="taskProfile"
    style={{ border: "solid 1px #000" }}
    onClick={goto}
  >
    <h4>{el.gift_title}</h4>
    <p>ОЧКИ:{el.task_point}</p>
    <p>{el.task_time / 60}</p>
  </div>
);

export { TaskCard };
