import React from 'react';

import { renderWithTheme } from '../../../utils/test-utils';
import { TagList } from '../tag';


describe('tag.js', () => {

    describe('TagList', () => {

        it('should render title if one was passed', () => {

            expect(renderWithTheme(<TagList label="42" tags={[]} />).find('span').text()).toBe('42');

            expect(renderWithTheme(<TagList tags={[]} />).find('span').length).toBe(0);
        });
    });
});
