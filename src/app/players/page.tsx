import Image from "next/image";
import Pagination from "@/components/Pagination";
import { countries } from "@/helpers/countryData";
import Link from "next/link";

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

async function getPlayerData(offset = "0"): Promise<PlayerData> {
  const res = await fetch(
    `https://api.cricapi.com/v1/players?apikey=${process.env.NEXT_PUBLIC_CRICKET_API_KEY}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams: { offset: string };
}) {
  const { data: players, info } = await getPlayerData(searchParams.offset);

  return (
    <section className="flex flex-col gap-10 p-20">
      <h1 className="text-xl text-center">Players</h1>
      <div className="flex flex-wrap -m-4">
        {players.map((player) => (
          <Link
            href={`/players/${player.id}`}
            key={player.id}
            className="p-4 md:w-1/3"
          >
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              {/* <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={match.image} alt="match image"> */}
              <div className="p-6 flex flex-col justify-between h-full">
                <h2 className="text-xl text-indigo-600 mb-6 font-bold">
                  {player.name}
                </h2>
                <div className="flex items-center gap-3">
                  <p className="leading-relaxed">{player.country}</p>
                  <Image
                    src={
                      countries.find(
                        (country) => country.country === player.country
                      )?.flag ?? ""
                    }
                    alt={player.country}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        totalRows={info.totalRows}
        offset={info.offsetRows}
        route="players"
      />
    </section>
  );
}
