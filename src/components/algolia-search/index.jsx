import * as React from 'react'
import { navigateTo } from 'gatsby-link'
import Downshift from 'downshift'
import debounce from 'lodash.debounce'
import { compose, withProps } from 'recompose'
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
import { Arrow, Popup } from './popup'

let AutoComplete = ({ hits: sections, currentRefinement, debouncedRefine }) => (
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
                  onChange: e => debouncedRefine(e.target.value),
                  ref,
                })}
              />
            )}
          </Reference>

          {isOpen &&
            currentRefinement !== '' && (
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
)

let ConnectedAutoComplete = compose(
  connectAutoComplete,
  withProps(({ refine }) => ({ debouncedRefine: debounce(refine, 200) })),
)(AutoComplete)

const ALGOLIA_PREFIX = process.env.ALGOLIA_PREFIX || 'DEV'

let Search = ({ className }) => (
  <div className={className}>
    <InstantSearch
      appId="16WOJBASFD"
      apiKey="d176722c954b3e989cd504df6ab61266"
      indexName={`${ALGOLIA_PREFIX}_talks`}>
      <Configure hitsPerPage={4} />
      <Index indexName={`${ALGOLIA_PREFIX}_speakers`} />
      <Index indexName={`${ALGOLIA_PREFIX}_blog`} />
      <ConnectedAutoComplete />
    </InstantSearch>
  </div>
)

export { Search }

export default Search
