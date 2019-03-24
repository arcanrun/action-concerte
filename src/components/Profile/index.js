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

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
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
    const { tasks } = this.state;
    console.log("12312312", this.props);
    return (
      <div>
        {!this.props.userFromApi ? (
          <div>loading...</div>
        ) : (
          <>
            <div>Ваши баллы:{this.props.userFromApi.points}</div>
            <div>
              {tasks.map((el, i) => (
                <div key={i}>
                  <TaskCard
                    el={el}
                    goto={this.props.goto}
                    status={el.status}
                    getDataForTask={this.props.getDataForTask}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}
