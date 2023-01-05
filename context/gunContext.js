import { createContext, useReducer } from 'react'
import Gun from 'gun'

const gun = Gun()

export const GunContext = createContext()

const initialState = { messages: [] }

const reducer = (state, action) => {
  try {
    if (action.type == 'clear') return { messages: [] }
    if (action.type == 'add') {
      return { messages: [...state.messages, action.data] }
    }
  } catch (error) {
    console.error(error)
  }
}

export const GunProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const getMessages = _name => {
    const messagesRef = gun.get(_name)

    dispatch({
        type: 'clear'
    })

    messagesRef.map().once(message => {
        // console.log(message.sender)
        // console.log(message.username)
      dispatch({
        type: 'add',
        data: {
          sender: message.sender,
          content: message.content,
          avatar: message.avatar,
          createdAt: message.createdAt,
          messageId: message.messageId,
          isBullish: message.isBullish,
        },
      })
    })
  }

  return (
    <GunContext.Provider
      value={{
        gun,
        getMessages,
        state,
      }}
    >
      {children}
    </GunContext.Provider>
  )
}
