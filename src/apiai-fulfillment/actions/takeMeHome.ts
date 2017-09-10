import {getUserFromSessionId} from '../../chat-logics/databaseUser'
import {findPublicTransport} from './public-transport'

export const takeMeHome = async (sessionId: string, currentAddress: string) => {
  const user = await getUserFromSessionId(sessionId)
  console.log(currentAddress, user.address)
  return await findPublicTransport(currentAddress, user.address)
}