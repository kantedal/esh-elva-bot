
export interface IResponseJson {
  speech: string
  displayText: string
  contextOut?: any
}

export const generateResponseJson = (message: string, contextOut?: any): IResponseJson => {
  return {
    speech: message,
    displayText: message,
    contextOut,
  }
}