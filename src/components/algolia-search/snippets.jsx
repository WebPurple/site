import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex } from 'grid-styled'
import { Highlight, Snippet, PoweredBy } from 'react-instantsearch-dom'

import { firstHit, hasMatch } from './helpers'

let Title = styled.div`
  color: gray;
  text-align: right;
  min-width: 120px;
  border-right: 1px solid lightgray;
`

let Details = styled.div`
  text-decoration: none;
  color: #000;

  ${({ isActive }) => (isActive ? `background-color: #f9e9ff;` : '')};

  &:hover {
    background-color: #f9e9ff;
  }
`

let SuggestionLayout = ({ children: [title, details], isActive }) => (
  <Flex>
    <Box is={Title} flex="1" p="10px">
      {title}
    </Box>

    <Box is={Details} flex="4" p="10px" isActive={isActive}>
      {details}
    </Box>
  </Flex>
)

let User = styled.span`
  font-weight: bold;
`

let Content = styled.p`
  color: gray;
  font-size: 12px;
`

let hasMatchInTitle = hasMatch('title')
let hasMatchInSpeaker = hasMatch('speaker')

export let EventSnippet = ({ hit, isActive }) => (
  <SuggestionLayout isActive={isActive}>
    {hit.event.title}

    <Flex flexDirection="column">
      <div>
        <Highlight attribute="title" hit={hit} />,
        <Box is={User} ml="10px">
          <Highlight attribute="speaker" hit={hit} />
        </Box>
      </div>

      {!(hasMatchInTitle(hit) || hasMatchInSpeaker(hit)) && (
        <Content>
          <Snippet attribute="description" hit={hit} />
        </Content>
      )}
    </Flex>
  </SuggestionLayout>
)

export let SpeakerSnippet = ({ hit, isActive }) => (
  <SuggestionLayout isActive={isActive}>
    <Highlight attribute="title" hit={hit} />

    {(hit.organization || hit.jobTitle) && (
      <React.Fragment>
        <Highlight attribute="organization" hit={hit} />
        {hit.organization && hit.jobTitle && ', '}
        <Highlight attribute="jobTitle" hit={hit} />
      </React.Fragment>
    )}
  </SuggestionLayout>
)

let BlogDetails = firstHit([
  ['author', Highlight],
  ['headings', Snippet],
  ['content', Snippet],
])

export let BlogSnippet = ({ hit, isActive }) => (
  <SuggestionLayout isActive={isActive}>
    <Highlight attribute="title" hit={hit} />

    <Flex flexDirection="column">
      <Highlight attribute="author" hit={hit} />

      <Content>
        <BlogDetails hit={hit} />
      </Content>
    </Flex>
  </SuggestionLayout>
)

let ResultsPopup = styled.div`
  background: #fff;
  font-size: 14px;

  em {
    font-style: normal;
    background: ${({ theme }) => theme.liliac};
    color: ${({ theme }) => theme.warmPurple};
  }
`

let SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

let SectionTitle = styled.div`
  font-size: 18px;
  padding: 10px 20px;
  border-bottom: 1px solid lightgray;
`

let HitList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

let StyledPoweredBy = styled(PoweredBy)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  justify-content: flex-end;
  border-top: 1px solid lightgray;
  font-size: 10px;

  svg {
    height: 18px;
  }
`

let pickSnippet = (hit, isActive) => {
  let Snippet = hit.description
    ? EventSnippet
    : hit.headings
      ? BlogSnippet
      : SpeakerSnippet

  return <Snippet hit={hit} isActive={isActive} />
}
let renderSectionTitle = section =>
  /speakers/i.test(section.index)
    ? 'Speakers'
    : /talks/i.test(section.index)
      ? 'Talks'
      : 'Blog'

export let SuggestionList = React.forwardRef(
  ({ query, sections, highlightedIndex, getItemProps, ...rest }, ref) => {
    let sectionsWithHits = sections.filter(s => s.hits.length > 0)
    let hitIndex = -1

    return (
      <ResultsPopup ref={ref} {...rest}>
        {sectionsWithHits.length > 0 ? (
          <SectionList>
            {sectionsWithHits.map(section => (
              <li key={section.index}>
                <SectionTitle>{renderSectionTitle(section)}</SectionTitle>

                <HitList>
                  {section.hits.map(hit => (
                    <li
                      {...getItemProps({
                        index: ++hitIndex,
                        key: hit.objectID,
                        item: hit,
                      })}>
                      {pickSnippet(hit, highlightedIndex === hitIndex)}
                    </li>
                  ))}
                </HitList>
              </li>
            ))}
          </SectionList>
        ) : (
          <Flex fontSize="16px" justifyContent="center">
            <p>
              No results found for query <b>"{query}"</b> 😔
            </p>
          </Flex>
        )}

        <StyledPoweredBy />
      </ResultsPopup>
    )
  },
)
