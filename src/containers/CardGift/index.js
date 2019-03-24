import React, { Component } from 'react';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

export default class CardGift extends Component {
    render() {
        const { gift, onGiftClick } = this.props;
        const time = Math.round(gift.task_time / 60);
        let timeStr = Math.floor(time / 60) + ' часов';

        if (time < 60) timeStr = time + 'минут';

        return (
            <div className="bg_gift__wrap">
                <div className="bg_gift__fade" />
                <div className="bg_gift__content">
                    <h3 className="bg_gift__title">{gift.gift_title}</h3>
                    <div className="bg_gift__balls">
                        У вас 0 из {gift.task_point} баллов
                    </div>
                    <div className="bg_gift__timeout">Осталось: {timeStr}</div>
                    <Button
                        size="l"
                        className="bg_gift__get"
                        level="outline"
                        onClick={onGiftClick}
                        data-id={gift.id_task}
                    >
                        Получить
                    </Button>
                </div>
            </div>
        );
    }
}
