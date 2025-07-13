import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { dayjs } from '@/lib/dayjs'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

interface GetRoomsResponse {
  id: string
  name: string
  questionsCount: number
  createdAt: string
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
    <div className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-2 items-start gap-8">
          <div />

          <Card>
            <CardHeader>
              <CardTitle>Salas recentes</CardTitle>
              <CardDescription>
                Acesso rápido para as salas criadas recentemente
              </CardDescription>
              <CardContent className="flex flex-col gap-3 pt-4">
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      Carregando salas...
                    </span>
                  </div>
                )}

                {data?.map((room) => {
                  return (
                    <Link
                      key={room.id}
                      className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50"
                      to={`/rooms/${room.id}`}
                    >
                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="font-medium">{room.name}</h3>

                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {dayjs(room.createdAt).toNow()}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {room.questionsCount} perguntas
                          </Badge>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-sm">
                        Entrar
                        <ArrowRight className="size-3" />
                      </span>
                    </Link>
                  )
                })}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  )
}
