
export interface IResponseJson {
  speech: string
  displayText: string
  contextOut?: any
  data?: any
}

export const generateResponseJson = (message: string): IResponseJson => {
  return {
    speech: message,
    displayText: message,
  }
}