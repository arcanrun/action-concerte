import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    View,
    Panel,
    PanelHeader,
    HeaderButton,
    platform,
    IOS,
    ScreenSpinner,
    Group,
    Cell,
} from '@vkontakte/vkui';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Place from '@vkontakte/icons/dist/24/place';

import { fetchConcerts } from '../../actions/concertsActions';

import ListCardEvents from '../ListCardEvents';
import Event from '../Event';
import Gift from '../Gift';

class EventsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'events-list',
            concerts: [],
            gift: null,
            dataEvent: {},
            popout: null,
        };
    }

    componentDidMount() {
        this.setState({ popout: <ScreenSpinner /> });
        this.props.fetchConcerts();
        setTimeout(() => {
            this.setState({ popout: null });
        }, 500);
    }

    render() {
        const concerts = this.props.concerts || [];

        return (
            <View
                popout={this.state.popout}
                id={this.props.id}
                activePanel={this.state.activePanel}
            >
                <Panel id="events-list">
                    <PanelHeader>Мероприятия</PanelHeader>
                    <Group>
                        <Cell expandable before={<Icon24Place />}>
                            Санкт-Петербург
                        </Cell>
                    </Group>
                    <ListCardEvents
                        events={concerts}
                        onEventClick={this.onEventClick.bind(this)}
                    />
                </Panel>
                <Panel id="event">
                    <PanelHeader
                        transparent={true}
                        noShadow={true}
                        left={
                            <HeaderButton
                                onClick={() =>
                                    this.setState({ activePanel: 'events-list' })
                                }
                            >
                                {platform() === IOS ? (
                                    <Icon28ChevronBack />
                                ) : (
                                    <Icon24Back />
                                )}
                            </HeaderButton>
                        }
                    />
                    <Event
                        data={this.props.concerts.filter(
                            event => event.id === this.state.currentEventId
                        )}
                        onGiftClick={this.onGiftClick.bind(this)}
                    />
                </Panel>
                <Panel id="gift" theme="white">
                    <PanelHeader
                        left={
                            <HeaderButton
                                onClick={() => this.setState({ activePanel: 'event' })}
                            >
                                {platform() === IOS ? (
                                    <Icon28ChevronBack />
                                ) : (
                                    <Icon24Back />
                                )}
                            </HeaderButton>
                        }
                    >Розыгрыш</PanelHeader>
                    <Gift data={this.state.gift} />
                </Panel>
            </View>
        );
    }

    onEventClick = e =>
        this.setState({
            activePanel: 'event',
            currentEventId: +e.currentTarget.dataset.id,
        });

    onGiftClick = e => {
        const giftId = +e.currentTarget.dataset.id;

        this.setState({ popout: <ScreenSpinner /> });

        fetch('http://127.0.0.1:8000/get-tasks/', {
            method: 'POST',
            body: JSON.stringify({ id_concert: this.state.currentEventId }),
        })
            .then(res => res.json())
            .then(res => {
                this.setState({
                    gift: res.RESPONSE.filter(gift => gift.id_task === giftId),
                    activePanel: 'gift'
                });

                setTimeout(() => {
                    this.setState({ popout: null });
                }, 500);

                return res;
            })
            .catch(res => console.log(Error(res)));
    };
}

const mapStateToProps = state => ({
    concerts: state.concerts.concerts,
});

export default connect(
    mapStateToProps,
    {
        fetchConcerts: fetchConcerts,
    }
)(EventsView);
