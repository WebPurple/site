export let eventTags = event =>
  event.talks.reduce(
    (allTags, talk) => (talk.tags ? allTags.concat(talk.tags) : allTags),
    [],
  )

let randomElement = arr => () => arr[Math.floor(arr.length * Math.random())]

export let eventBigBackground = randomElement([
  'https://sun1-7.userapi.com/c834401/v834401468/692ef/4vlq71le-Vk.jpg',
])

export let eventSmallBackground = randomElement([
  'https://sun9-6.userapi.com/c824603/v824603288/e07fe/WSzen0Cronk.jpg',
  'https://sun1-10.userapi.com/c824603/v824603288/e0718/6exBJ9HUQQI.jpg',
  'https://sun9-6.userapi.com/c824603/v824603288/e0862/yj5e-5Zvq7Q.jpg',
  'https://sun9-1.userapi.com/c824603/v824603288/e066e/X8PCs6ZJUn4.jpg',
  'https://sun9-2.userapi.com/c834401/v834401468/693f3/dXg-41jBFgQ.jpg',
])
