import React, { Component } from 'react';
import { Cell, List, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Icon24Recent from '@vkontakte/icons/dist/24/recent';

export default class Gift extends Component {
    render() {
        const { data } = this.props;
        const time = Math.round(data[0].task_time / 60);
        let timeStr = Math.floor(time / 60) + ' часов';

        if (time < 60) timeStr = time + 'минут';

        return (
            <div>
                <Div className="gift_page__header">
                    {data[0].gift_title}
                    <Cell before={<Icon24Recent />}>Осталось: {timeStr}</Cell>
                </Div>
            </div>
        );
    }
}
