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
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/get-all-users/")
      .then(res => res.json())
      .then(res => {
        this.setState({ users: res.RESPONSE });
        return res;
      })
      .catch(res => console.log(Error(res)));
  }
  render() {
    return (
      <div>
        <div>
          <h1>Потрачено:</h1>
          {this.state.users
            .sort((a, b) => b.wasted - a.wasted)
            .map((el, i) => (
              <div key={i}>
              <b>{i}</b>
                <span>{el.Firstname}</span>
                <span>{el.Lastname}</span>
                <span>{el.wasted}</span>
                <p>{el.concerts}</p>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
