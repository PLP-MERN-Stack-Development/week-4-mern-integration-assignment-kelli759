import { createContext, useReducer, useContext } from 'react'

const PostContext = createContext()

const initialState = {
  posts: [],
  loading: false,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING': return { ...state, loading: true }
    case 'ERROR': return { ...state, loading: false, error: action.payload }
    case 'SET_POSTS': return { posts: action.payload, loading: false, error: null }
    default: return state
  }
}

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  return useContext(PostContext)
}
