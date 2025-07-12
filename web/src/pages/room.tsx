import { useParams, Navigate } from 'react-router-dom'

export function Room() {
  const { roomId } = useParams<{ roomId: string }>()

  if (!roomId) {
    return <Navigate replace to="/" />
  }

  return <div>Room ID: {roomId}</div>
}
