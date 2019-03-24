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

import { fetchConcerts } from "../actions/concertsActions";
import { Spinner } from "../components/Spinner";
import { CardEvent } from "./CardEvent";
import { TaskProfile } from "../components/TaskProfile";
import { ConcertProfile } from "../components/ConcertProfile";

const osname = platform();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_vk: 65122543,
      activeStory: "events",
      activePanel: "events",
      dataFrom: 0,
      concerts: [],
      dataForTaks: []
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  getDataForTask = data => {
    this.setState({ dataForTaks: data }, () => {
      console.log("=====>DATATASK", this.state.dataForTaks);
    });
  };

  goBack = to => {
    this.setState({ activePanel: to });
  };

  componentDidMount() {
    this.props.fetchConcerts();
  }
  goToSomeWhere = e => {
    // console.log("GOTOTOOT", e.currentTarget.dataset.goto);
    const dataset = e.currentTarget.dataset.goto;
    this.setState({
      activePanel: dataset
    });
  };
  goToEventProgile = e => {
    const id = e.currentTarget.id;
    this.setState({
      dataFrom: this.props.concerts[id],
      activePanel: "cocnertProfile"
    });
  };
  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }
  render() {
    const concerts = this.props.concerts || [];
    const dataFrom = this.state.dataFrom;

    return this.state.isFetching ? (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <Spinner />
      </div>
    ) : (
      <div className="App">
        <Epic
          activeStory={this.state.activeStory}
          tabbar={
            <Tabbar>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "messages"}
                data-story="events"
                text="Главная"
              >
                A
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "tasks"}
                data-story="tasks"
                text="Задания"
              >
                A
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "archive"}
                data-story="archive"
                text="Архив"
              >
                A
              </TabbarItem>
            </Tabbar>
          }
        >
          <View id="events" activePanel={this.state.activePanel}>
            <Panel id="events">
              <PanelHeader>Мероприятия</PanelHeader>

              {concerts.map((el, i) => (
                <CardEvent
                  id={i}
                  // onClick={() =>
                  //   this.setState({ activePanel: "cocnertProfile" })
                  // }
                  onClick={e => this.goToEventProgile(e)}
                  key={el.id}
                  title={el.title}
                  img={el.subevents[0].image}
                  date={el.subevents[0].date}
                />
              ))}
            </Panel>
            <Panel id="cocnertProfile">
              <ConcertProfile
                getDataForTask={this.getDataForTask}
                goto={this.goToSomeWhere}
                dataFrom={this.state.dataFrom}
                goBack={() => this.goBack("events")}
              />
            </Panel>
            <Panel id="taskProfile">
              <TaskProfile
                id_vk={this.state.id_vk}
                dataForTask={this.state.dataForTaks}
                goBack={() => this.goBack("cocnertProfile")}
              />
            </Panel>
          </View>
          <View id="tasks" activePanel="tasks">
            <Panel id="tasks">
              <PanelHeader>Задания</PanelHeader>
            </Panel>
          </View>
          <View id="archive" activePanel="archive">
            <Panel id="archive">
              <PanelHeader>Архив</PanelHeader>
            </Panel>
          </View>

          <View id="notifications" activePanel="notifications">
            <Panel id="notifications">
              <PanelHeader>Notifications</PanelHeader>
            </Panel>
          </View>
        </Epic>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  concerts: state.concerts.concerts,
  isFetching: state.concerts.isFetching
});

export default connect(
  mapStateToProps,
  {
    fetchConcerts: fetchConcerts
  }
)(App);
