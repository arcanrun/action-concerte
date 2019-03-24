import React, { Component } from 'react';

import CardGift from './CardGift';

export default class ListCardGift extends Component {
    render() {
        const giftCards = this.props.gifts.map((gift, index) => (
            <CardGift key={index} gift={gift} onGiftClick={this.props.onGiftClick} />
        ));

        return (
            <div>
                {this.props.gifts.length === 0 ? <div>Заданий пока нет</div> : giftCards}
            </div>
        );
    }
}
