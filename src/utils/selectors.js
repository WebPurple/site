// @flow
import { flatten, map, pipe, prop, uniq } from 'ramda'

interface IEvent {
  date: Date;
}

const viewTags = talk => (talk.tags ? talk.tags : [])

export let eventTags = pipe(
  prop('talks'),
  map(viewTags),
  flatten,
  uniq,
)

let getEventNode = (event: { node: * }) => event.node

export let selectPastEvents = (events: Array<{ node: IEvent }>): IEvent[] =>
  events.map(getEventNode).filter(e => e.date && new Date(e.date) < new Date())

export let selectUpcomingEvents = (events: Array<{ node: IEvent }>): IEvent[] =>
  events.map(getEventNode).filter(e => !e.date || new Date(e.date) > new Date())

export let selectNearestEvent = (
  events: Array<{ node: IEvent }>,
): IEvent | null =>
  selectUpcomingEvents(events).reduce(
    (nearestEvent, event) =>
      nearestEvent && nearestEvent.date < event.date ? nearestEvent : event,
    null,
  )

let randomElement = arr => () => arr[Math.floor(arr.length * Math.random())]

export let eventBigBackground = randomElement([
  'https://sun1-7.userapi.com/c834401/v834401468/692ef/4vlq71le-Vk.jpg',
  'https://sun1-8.userapi.com/c834401/v834401468/69213/lDIlIw-LrEk.jpg',
  'https://sun9-8.userapi.com/c834401/v834401468/693b7/qRaQDsaR6kk.jpg',
  'https://sun1-6.userapi.com/c834401/v834401468/692e5/utx6tzthHvw.jpg',
  'https://sun1-12.userapi.com/c834401/v834401468/69227/3URhGuxDhow.jpg',
  'https://sun9-5.userapi.com/c834203/v834203543/1dc7b/4xuCrTlb_N0.jpg',
  'https://sun9-7.userapi.com/c834203/v834203543/1dba9/MEpcnTB5VbQ.jpg',
])

export let eventSmallBackground = randomElement([
  'https://sun9-6.userapi.com/c824603/v824603288/e07fe/WSzen0Cronk.jpg',
  'https://sun1-10.userapi.com/c824603/v824603288/e0718/6exBJ9HUQQI.jpg',
  'https://sun9-6.userapi.com/c824603/v824603288/e0862/yj5e-5Zvq7Q.jpg',
  'https://sun9-1.userapi.com/c824603/v824603288/e066e/X8PCs6ZJUn4.jpg',
  'https://sun9-2.userapi.com/c834401/v834401468/693f3/dXg-41jBFgQ.jpg',
])

export let subscibtionBackground = randomElement([
  'https://sun1-7.userapi.com/c824603/v824603288/e077c/FpVDSB47t3g.jpg',
])
