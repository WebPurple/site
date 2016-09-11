import * as React from 'react';
import { get as loadScript } from 'scriptjs';

const APP_ID = '1094823327247465';

export default class VkCommunityWidget extends React.Component {

    componentWillMount() {
        loadScript(`//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.7&appId=${APP_ID}`, () => 1);
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
