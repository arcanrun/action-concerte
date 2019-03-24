import React, { Component } from 'react';
import { TabbarItem, Tabbar } from '@vkontakte/vkui';

export default class Tabs extends Component {
    render() {
        const { selectedTab, onTabClick } = this.props;

        return (
            <Tabbar>
                <TabbarItem
                    onClick={onTabClick}
                    selected={selectedTab === 'events'}
                    data-story="events"
                    text="Главная"
                >
                    Б
                </TabbarItem>
                <TabbarItem
                    onClick={onTabClick}
                    selected={selectedTab === 'tasks'}
                    data-story="tasks"
                    text="Задания"
                >
                    A
                </TabbarItem>
                <TabbarItem
                    onClick={onTabClick}
                    selected={selectedTab === 'archive'}
                    data-story="archive"
                    text="Архив"
                >
                    A
                </TabbarItem>
            </Tabbar>
        );
    }
}
