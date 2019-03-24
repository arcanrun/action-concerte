import React, { Component } from 'react';

import { View, Panel, PanelHeader, Epic } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Tabs from './Tabs';
import EventsView from './EventsView';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'events',
        };
    }

    render() {
        return (
            <Epic
                activeStory={this.state.activeStory}
                tabbar={
                    <Tabs
                        selectedTab={this.state.activeStory}
                        onTabClick={this.handleTabClick.bind(this)}
                    />
                }
            >
                <EventsView id="events" />
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
            </Epic>
        );
    }

    handleTabClick = e => this.setState({ activeStory: e.currentTarget.dataset.story });
}

export default App;
