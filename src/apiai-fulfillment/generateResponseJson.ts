
export interface IResponseJson {
  speech: string
  displayText: string
  contextOut?: any
}

export const generateResponseJson = (message: string, contextOut?: any): IResponseJson => {
  console.log('generating json with:')
  console.log(message)
  return {
    speech: message,
    displayText: message,
    contextOut,
  }
}