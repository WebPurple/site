import { client } from 'nightwatch-cucumber'
import { defineSupportCode } from 'cucumber'

import { appUrl } from './constants'

defineSupportCode(({ Given, setDefaultTimeout }) => {

    setDefaultTimeout(10 * 1000)

    Given(/^I open WebPurple's "(.+)" page$/, page => client
        .url(`${appUrl}/${page === 'home' ? '' : page}`)
        .waitForElementVisible('main', 1000))

})
