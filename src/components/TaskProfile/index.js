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

export class TaskProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForTask: this.props || [],
      disabler: false
    };
  }
  takePartInt = () => {
    const { id_vk } = this.props;
    const { id_task } = this.state.dataForTask.dataForTask;
    const data = {
      id_vk,
      id_task
    };
    fetch("http://127.0.0.1:8000/take-part-in/", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("RECIVED:", res);
        this.setState({ disabler: !this.disabler });
        return res;
      })
      .catch(res => console.log(Error(res)));
  };

  componentDidMount() {
    console.log("FFFFF", this.state.dataForTask.dataForTask);
  }
  render() {
    const { goBack, id_vk } = this.props;
    console.log("<TaskProfie>", this.state);
    const {
      type_task,
      task_title,
      task_time,
      task_point,
      gift_title,
      list_id_users
    } = this.state.dataForTask.dataForTask;

    return (
      <>
        <PanelHeader
          addon={<HeaderButton onClick={goBack}>Назад</HeaderButton>}
          left={
            <HeaderButton onClick={goBack}>
              {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </HeaderButton>
          }
        >
          {parseInt(type_task) === 1 ? "Розыгрыш" : "Испытай удачу"}
        </PanelHeader>
        <div style={{ border: "1px solid #0000" }}>
          <h3>{gift_title}</h3>
          {/* <p>Необходиом выплонить:{Array.isArray(task_title)? <ul>{task_title.map((el,i)=>{<li>})}</ul> : {task_title}}</p> */}
          <p>Необходиом выплонить:{task_title}</p>
          <p>отсталос времени: {task_time}</p>
          <p>вы заработает: {task_point}</p>
        </div>
        {list_id_users.includes("" + id_vk) ? (
          <button style={{ fontSize: "20px" }} disabled>
            Дождитесь завершения задания
          </button>
        ) : (
          <button
            onClick={this.takePartInt}
            style={{ fontSize: "20px" }}
            disabled={this.state.disabler}
          >
            {this.state.disabler
              ? "Дождитесь завершения задания"
              : " Принять участие"}
          </button>
        )}
      </>
    );
  }
}
// gift_title: "Поздравление с днем рождения со стендап сцены"
// task_point: "90"
// task_time: "56000"
// task_title: "Два селфи с концерта"
// type_task: "1"
