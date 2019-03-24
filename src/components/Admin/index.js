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

import unsplashApi from "../../API/API";

export class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concerts: [],
      selectedConcert: "",
      descr: "",
      points: "",
      titleGit: ""
    };
  }
  componentDidMount() {
    fetch(unsplashApi("NONE", 100, 8))
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("----", res.message);
        this.setState({ concerts: res.message });
        return res.message;
      })
      .catch(err => Error(err));
  }
  handleChange = event =>
    this.setState({ selectedConcert: event.target.value });
  handleDescr = e => this.setState({ descr: e.target.value });
  handlePoints = e => this.setState({ points: e.target.value });
  handleTitleGift = e => this.setState({ titleGit: e.target.value });

  addData = () => {
    const dataTosend = {
      descr: this.state.descr,
      points: this.state.points,
      concerts: this.state.selectedConcert,
      titleGit: this.state.titleGit
    };
    fetch("http://127.0.0.1:8000/add-task/", {
      method: "POST",
      body: JSON.stringify(dataTosend)
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state);
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Выбрать концерт</h3>
        <select value={this.state.selectedConcert} onChange={this.handleChange}>
          {this.state.concerts.map((el, i) => (
            <option key={i} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <h3>Добоавить здание</h3>
        <div>
          <p>
            <label>Заголовок задания</label>
          </p>
          <textarea onChange={this.handleTitleTask} />
        </div>
        <div>
          <p>
            <label>Описание задания</label>
          </p>
          <textarea onChange={this.handleDescr} />
        </div>
        <div>
          <p>
            <label>Заголовок для поля Подарок</label>
          </p>
          <textarea onChange={this.handleTitleGift} />
        </div>
        <div>
          <p>
            <label>Баллы</label>
          </p>
          <input onChange={this.handlePoints} type="text" />
        </div>
        <button onClick={this.addData}>Send</button>
      </div>
    );
  }
}
