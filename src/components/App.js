import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Panel,
  PanelHeader,
  Epic,
  TabbarItem,
  Tabbar
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { fetchConcerts } from "../actions/concertsActions";
import { Spinner } from "../components/Spinner";
import { CardEvent } from "./CardEvent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStory: "events",
      concerts: []
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchConcerts();
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //     this.props.fetchConcerts();
  //   }
  // }

  onStoryChange(e) {
    this.setState({ activeStory: e.currentTarget.dataset.story });
  }
  render() {
    const concerts = this.props.concerts || [];

    console.log("----!!!", concerts);
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
          <View id="events" activePanel="events">
            <Panel id="events">
              <PanelHeader>Мероприятия</PanelHeader>

              {concerts.map(el => (
                <CardEvent
                  key={el.id}
                  title={el.title}
                  img={el.subevents[0].image}
                  date={el.subevents[0].date}
                />
              ))}
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
