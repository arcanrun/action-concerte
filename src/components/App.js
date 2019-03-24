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
import { Profile } from "../components/Profile";
import { TopUser } from "../components/ TopUsers";
import { Admin } from "../components/Admin";

const osname = platform();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_vk: 65122543,
      userFromApi: null,
      activeStory: "events",
      activePanel: "events",
      dataFrom: 0,
      concerts: [],
      dataForTaks: []
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

  getUserFromApi = data => {
    fetch("http://127.0.0.1:8000/get-user/", {
      method: "POST",
      body: JSON.stringify({ id_vk: data })
    })
      .then(res => res.json())
      .then(res => {
        console.log("(((9", res.RESPONSE);

        this.setState(
          { userFromApi: res.RESPONSE },
          console.log("now in state App", this.state.userFromApi)
        );
        return res;
      })
      .catch(res => console.log(Error(res)));
  };

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
    this.getUserFromApi(this.state.id_vk);
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
                selected={this.state.activeStory === "profile"}
                data-story="profile"
                text="Профиль"
              >
                A
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "top"}
                data-story="top"
                text="Топ"
              >
                A
              </TabbarItem>
              <TabbarItem
                onClick={this.onStoryChange}
                selected={this.state.activeStory === "admin"}
                data-story="admin"
                text="Admin"
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
                getDataForTask={this.getDataForTask}
                dataFrom={this.state.dataFrom}
                goBack={() => this.goBack("cocnertProfile")}
              />
            </Panel>
          </View>
          <View id="profile" activePanel="profile">
            <Panel id="profile">
              <PanelHeader>Личный кабинет</PanelHeader>
              <Profile
                goto={this.goToSomeWhere}
                getDataForTask={this.getDataForTask}
                goBack={() => this.goBack("cocnertProfile")}
                userFromApi={this.state.userFromApi}
                getUserFromApi={this.getUserFromApi}
                id_vk={this.state.id_vk}
              />
            </Panel>
            <Panel id="taskProfile">
              <TaskProfile
                id_vk={this.state.id_vk}
                dataForTask={this.state.dataForTaks}
                getDataForTask={this.getDataForTask}
                dataFrom={this.state.dataFrom}
                goBack={() => this.goBack("cocnertProfile")}
              />
            </Panel>
          </View>
          <View id="top" activePanel="top">
            <Panel id="top">
              <PanelHeader>Топ</PanelHeader>
              <TopUser />
            </Panel>
          </View>
          <View id="admin" activePanel="admin">
            <Panel id="admin">
              <PanelHeader>Admin</PanelHeader>
              <Admin />
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
