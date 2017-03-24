import * as React from 'react';
import { get as loadScript } from 'scriptjs';

const COMMUNITY_ID = 94098151;
const WIDGET_ROOT_ID = 'vk_community_widget';

export const WidgetMode = {
    MEMBERS: 0,
    NAME_ONLY: 1,
    FEED: 2,
};

const defaultProps = {
    mode: WidgetMode.MEMBERS,
    width: 'auto',
    height: '300',
    color1: '#FFF',
    color2: '#4A148C',
    color3: '#7B1FA2',
};

export default class VkCommunityWidget extends React.Component {

    componentDidMount() {
        loadScript('//vk.com/js/api/openapi.js?127', () => {
            // eslint-disable-next-line no-undef, new-cap
            VK.Widgets.Group(WIDGET_ROOT_ID, { ...defaultProps, ...this.props }, COMMUNITY_ID);
        });
    }

    render() {
        return <div id={WIDGET_ROOT_ID} />;
    }
}

VkCommunityWidget.propTypes = {
    mode: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    color1: React.PropTypes.string,
    color2: React.PropTypes.string,
    color3: React.PropTypes.string,
};
