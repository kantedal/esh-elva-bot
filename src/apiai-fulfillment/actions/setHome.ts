import {getDatabaseUser, getUserFromSessionId, setSessionId, setUserProperty} from '../../chat-logics/databaseUser'

export const setHome = async (sessionId: string, homeAddress: string) => {
  return setUserProperty(sessionId, 'homeAddress', homeAddress)
}