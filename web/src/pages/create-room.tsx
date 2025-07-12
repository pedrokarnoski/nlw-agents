import { useQuery } from '@tanstack/react-query'

interface GetRoomsResponse {
  id: string
  name: string
}

export function CreateRoom() {
  const { data, isLoading } = useQuery<GetRoomsResponse[]>({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms')
      const result = await response.json()
      return result
    },
  })

  return (
    <div>
      <h1>Create Room</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data?.map((room) => (
            <li key={room.id}>{room.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
