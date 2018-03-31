export let eventTags = event =>
  event.talks.reduce(
    (allTags, talk) => (talk.tags ? allTags.concat(talk.tags) : allTags),
    [],
  )
