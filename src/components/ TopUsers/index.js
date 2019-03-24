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
import { TaskCard } from "../TaskCard";
const osname = platform();

export class TopUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    fetch("http://127.0.0.1:8000/get-your-tasks/", {
      method: "POST",
      body: JSON.stringify({
        id_vk: this.props.id_vk,
        search_for: this.props.userFromApi.active_tasks
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({ tasks: res.RESPONSE });
        return res;
      })
      .catch(res => console.log(Error(res)));
  }
  render() {
    return <div>TOps</div>;
  }
}
