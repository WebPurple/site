import * as React from 'react';
import { get as loadScript } from 'scriptjs';

export default class GithubButton extends React.Component {

    componentWillMount() {
        loadScript('//buttons.github.io/buttons.js', () => undefined);
    }

    render() {
        return (
            <a
                className="github-button"
                href="https://github.com/kitos/web-purple/fork"
                data-style="mega"
                data-count-href="/kitos/web-purple/network"
                data-count-api="/repos/kitos/web-purple#forks_count"
                data-count-aria-label="# forks on GitHub"
                aria-label="Fork kitos/web-purple on GitHub">
                Fork
            </a>
        );
    }
}
