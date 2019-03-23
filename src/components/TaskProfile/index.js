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
const osname = platform();

class TaskProfile extends React.Component {
  render() {
    const { goBack } = this.props;
    return (
      <>
        <PanelHeader
          addon={<HeaderButton onClick={goBack}>Назад</HeaderButton>}
          left={
            <HeaderButton onClick={goBack}>
              {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </HeaderButton>
          }
        />
        <h1>TASK PROFILE</h1>
      </>
    );
  }
}

export { TaskProfile };
