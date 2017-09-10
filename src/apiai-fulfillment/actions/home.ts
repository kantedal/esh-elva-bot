
import {getDatabaseUser, getUserFromSessionId, setSessionId, setUserProperty} from '../../chat-logics/databaseUser'

export const setHome = async (sessionId: string, homeAddress: string) => {
  try {
    await setUserProperty(sessionId, 'homeAddress', homeAddress)
    return `Okey, saved your address! You live at ${homeAddress} 🏡`
  } catch (err) {
    return 'Something went wrong with setting your address 😞'
  }
}

export const getHome = async (sessionId: string) => {
  try {
    const user = await getUserFromSessionId(sessionId)
    return `Your home address is ${user.homeAddress}`
  } catch (err) {
    return 'Error'
  }
}
