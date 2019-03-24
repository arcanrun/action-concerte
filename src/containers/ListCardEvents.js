import React, { PureComponent } from 'react';
import CardEvent from './CardEvent';

export default class ListCardEvents extends PureComponent {
    render() {
        const eventCards = this.props.events.map((event, index) => (
            <CardEvent
                key={index}
                event={event}
                onClick={this.props.onEventClick}
            />
        ));

        return <div>{eventCards}</div>;
    }
}
