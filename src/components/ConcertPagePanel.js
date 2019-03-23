import React, { Component } from "react";
import { connect } from "react-redux";
// import { taskAction } from "../actions";

import "@vkontakte/vkui/dist/vkui.css";

import { TaskCard } from "../components/TaskCard";
class ConcertPagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    const idConcert = this.props.dataFrom.id;
    const dataTosend = { id_concert: idConcert };
    // console.log(dataTosend);
    fetch("http://127.0.0.1:8000/get-tasks/", {
      method: "POST",
      body: JSON.stringify(dataTosend)
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
    const tasks = this.state.tasks || [];

    const { dataFrom, goto } = this.props;

    return (
      <>
        <div style={{ background: "aqua" }}>
          <div>{dataFrom.title}</div>
          <div>{dataFrom.subevents[0].date}</div>
          <div>{dataFrom.seo.link}</div>
          <div>
            от {dataFrom.min_price} до {dataFrom.max_price}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>ВЫ можете получить:</div>

        <div>
          {tasks.length === 0 ? (
            <div>Заданий пока нет</div>
          ) : (
            tasks.map((el, i) => <TaskCard goto={goto} key={i} el={el} />)
          )}
        </div>
      </>
    );
  }
}

export default connect(
  null,
  {}
)(ConcertPagePanel);
