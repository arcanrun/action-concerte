import React, { PureComponent } from 'react';
import { Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style.css';

import Icon24FavoriteOutline from '@vkontakte/icons/dist/24/favorite_outline';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Recent from '@vkontakte/icons/dist/24/recent';

export default class CardEvent extends PureComponent {
    render() {
        const { event } = this.props;
        const imageUrl = event.subevents[0].image
            ? 'http://media.cultserv.ru/i/300x200/' + event.subevents[0].image
            : 'data:image/jpeg;base64,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';
        const date = new Date(event.subevents[0].date);
        const months = [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря',
        ];
        const beautyDate =
            date.getDate() +
            ' ' +
            months[date.getMonth()] +
            ' в ' +
            (date.getHours() < 9 ? '0' : '') +
            date.getHours() +
            ':' +
            (date.getMinutes() < 9 ? '0' : '') +
            date.getMinutes();

        return (
            <div className="event_card" onClick={this.props.onClick} data-id={event.id}>
                <div className="event_card__image_wrap">
                    <div
                        className="event_card__image"
                        style={{ backgroundImage: 'url(' + imageUrl + ')' }}
                    />
                </div>
                <div className="event_card__fade" />
                <Button className="event_card__favorite" level="tertiary">
                    <Icon24FavoriteOutline />
                </Button>
                <div className="event_card__info">
                    <div className="event_card__title">{event.title}</div>
                    <div className="event_card__info_item_wrap">
                        <Icon24Recent />
                        {beautyDate}
                    </div>
                    <div className="event_card__info_item_wrap">
                        <Icon24Place />
                        {event.subevents[0].venue.address}
                    </div>
                </div>
            </div>
        );
    }
}
