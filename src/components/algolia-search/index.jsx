import * as React from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'
import { width } from 'styled-system'
import Downshift from 'downshift'
import { Manager, Popper, Reference } from 'react-popper'
import { Portal } from 'react-portal'
import {
  Configure,
  connectAutoComplete,
  Index,
  InstantSearch,
} from 'react-instantsearch-dom'

import { SuggestionList } from './snippets'
import { SearchInput } from './search-input'

const ALGOLIA_PREFIX = process.env.ALGOLIA_PREFIX || 'DEV'

let Popup = styled.div`
  ${width};
  background: #fff;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 3px;
  margin-top: 10px; // for Arrow
`

let Arrow = styled.div`
  position: absolute;
  top: 0;
  width: 20px;
  height: 10px;

  margin-top: -9px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  &::before {
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #000 transparent;
  }

  &::after {
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #fff transparent;
  }
`

let AutoComplete = connectAutoComplete(
  ({ hits: sections, currentRefinement, refine }) => (
    <Manager>
      <Downshift
        itemToString={(/* do not fill in input */) => ''}
        onSelect={hit => navigateTo(hit.slug)}>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <Reference>
              {({ ref }) => (
                <SearchInput
                  {...getInputProps({
                    placeholder: 'Search...',
                    onChange: e => refine(e.target.value),
                    ref,
                  })}
                />
              )}
            </Reference>

            {isOpen && (
              <Portal>
                <Popper placement="bottom">
                  {({ ref, style, placement, arrowProps }) => (
                    <Popup
                      {...getMenuProps({
                        innerRef: ref,
                        refKey: 'innerRef',
                        style,
                        w: [1, '600px'],
                      })}>
                      <SuggestionList
                        getItemProps={getItemProps}
                        highlightedIndex={highlightedIndex}
                        query={currentRefinement}
                        sections={sections}
                      />

                      <Arrow
                        innerRef={arrowProps.ref}
                        style={arrowProps.style}
                      />
                    </Popup>
                  )}
                </Popper>
              </Portal>
            )}
          </div>
        )}
      </Downshift>
    </Manager>
  ),
)

let Search = ({ className }) => (
  <div className={className}>
    <InstantSearch
      appId="16WOJBASFD"
      apiKey="d176722c954b3e989cd504df6ab61266"
      indexName={`${ALGOLIA_PREFIX}_talks`}>
      <Configure hitsPerPage={4} />
      <Index indexName={`${ALGOLIA_PREFIX}_speakers`} />
      <Index indexName={`${ALGOLIA_PREFIX}_blog`} />
      <AutoComplete />
    </InstantSearch>
  </div>
)

export { Search }

export default Search
