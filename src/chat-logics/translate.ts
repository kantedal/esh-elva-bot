const translate = require('google-translate-api')
import SessionManager from '../SessionManager'

export const translateMessage = async (message: string, to: string, from?: string, fromUser: boolean = false) => {
  const response = await translate(message, { to })
  console.log('translate details:')
  console.log(response.from)
  console.log(response)

  // We don't need to translate english from user input
  if (fromUser && response.from.language.iso === 'en') {
    return message
  }
  return response.text
}

export const setCurrentLanguageForMessage = async (message: string, userSessionId: string) => {
  const response = await translate(message)
  const lang = response.from.language.iso
  SessionManager.Instance.setCurrentLanguageForUser(userSessionId, lang)
}
