import events, {IEvent} from '../data/eventForImmigrants'
import swedishDirectionsByDifficulty from '../data/swedishForImmigrants'

export const getRandomEventForImmigrants = async () => {
  let answer = ''
  const event = events[Math.floor(Math.random() * events.length)]

  answer = `How about ${event.title}? \n
    ${event.desc}\n
    You can learn more by sending an email to ${event.mail}`

  if (event.phone !== '') {
    answer += ` or by calling ${event.phone}`
  }

  answer += `.\n Otherwise feel free to ask again!`

  return answer
}

export const getSwedishDirections = async (difficulty: string) => {
  return swedishDirectionsByDifficulty[difficulty]
}
