import {getUserFromSessionId} from '../../chat-logics/databaseUser'
import {findPublicTransport} from './public-transport'

export const takeMeHome = async (sessionId: string, currentAddress: string) => {
  const user = await getUserFromSessionId(sessionId)
  return await findPublicTransport(currentAddress, user.address)
}