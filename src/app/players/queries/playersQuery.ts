import { useQuery } from "@tanstack/react-query"
import { getPlayerData } from "../page";

export const useFetchPlayersQuery = (search: string) => {
  return useQuery({
    queryKey: ["players", { search }],
    queryFn: () => getPlayerData(search),
  });
}