import {getDatabaseUser, getUserFromSessionId, setSessionId, setUserProperty} from '../../chat-logics/databaseUser'

export const setHome = async (sessionId: string, homeAddress: string) => {
  await setUserProperty(sessionId, 'homeAddress', homeAddress)
  return {}
}