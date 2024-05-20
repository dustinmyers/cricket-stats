import Image from "next/image";
import Pagination from "@/components/Pagination";
import { countries } from "@/helpers/countryData";
import Link from "next/link";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PlayerList from "./components/PlayerList";

interface Player {
  id: string;
  name: string;
  country: string;
}
interface PlayerData {
  apikey: string;
  data: Player[];
  status: "success" | "error";
  info: {
    hitsToday: number;
    hitsUsed: number;
    hitsLimit: number;
    credits: number;
    server: number;
    offsetRows: number;
    totalRows: number;
    queryTime: number;
    s: number;
    cache: number;
  };
}

export async function getPlayerData(
  offset = "0",
  search = ""
): Promise<PlayerData> {
  const res = await fetch(
    `https://api.cricapi.com/v1/players?apikey=${process.env.NEXT_PUBLIC_CRICKET_API_KEY}&offset=${offset}&search=${search}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { offset: string; search: string };
}) {
  // Fetch data
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["players", { search: searchParams.search }],
    queryFn: () => getPlayerData(searchParams.offset, searchParams.search),
  });

  return (
    <section className="flex flex-col gap-10 p-20">
      <h1 className="text-xl text-center">Players</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlayerList />
      </HydrationBoundary>
    </section>
  );
}
