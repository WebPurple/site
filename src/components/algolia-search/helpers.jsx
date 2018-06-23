import * as React from 'react'

export let hasMatch = field => hit => {
  let match = hit => hit.matchLevel !== 'none'
  let fieldHit = hit._highlightResult[field]

  return Array.isArray(fieldHit) ? fieldHit.some(match) : match(fieldHit)
}

export let firstHit = attrs => ({ hit }) => {
  let attrToRender = attrs.find(([attrName]) => hasMatch(attrName)(hit))

  if (attrToRender) {
    let [name, Comp] = attrToRender
    return <Comp attribute={name} hit={hit} />
  }

  return null
}
