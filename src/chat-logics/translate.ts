const translate = require('google-translate-api')

export const translateMessage = async (message: string, to: string, from?: string) => {
  const response = await translate(message, { to })
  return response.text
}