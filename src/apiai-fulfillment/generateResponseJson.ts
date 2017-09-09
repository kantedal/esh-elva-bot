
export interface IResponseJson {
  speech: string
  displayText: string
}

export const generateResponseJson = (message: string): IResponseJson => {
  return {
    speech: message,
    displayText: message
  }
}