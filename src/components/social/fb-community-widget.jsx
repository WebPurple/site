import * as React from 'react';
import { get as loadScript } from 'scriptjs';

const APP_ID = '1094823327247465';
const FB_API_VERSION = 'v2.7';

export default class VkCommunityWidget extends React.Component {

    componentDidMount() {
        loadScript('//connect.facebook.net/ru_RU/sdk.js',
            () => {
                /* eslint-disable no-undef */
                FB.init({
                    appId: APP_ID,
                    version: FB_API_VERSION,
                });
                FB.XFBML.parse();
                /* eslint-enable no-undef */
            });
    }

    render() {
        return (
            <div
                className="fb-page"
                data-href="https://www.facebook.com/WebPurple/"
                data-width="400"
                data-height="400"
                data-small-header="false"
                data-adapt-container-width="false"
                data-hide-cover="false"
                data-show-facepile="true">
                <blockquote cite="https://www.facebook.com/WebPurple/" className="fb-xfbml-parse-ignore">
                    <a href="https://www.facebook.com/WebPurple/">WebPurple</a>
                </blockquote>
            </div>
        );
    }
}
