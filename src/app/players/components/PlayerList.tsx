"use client";
import { countries } from "@/helpers/countryData";
import Image from "next/image";
import Link from "next/link";
import { useFetchPlayersQuery } from "../queries/playersQuery";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

const PlayerList: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const { data: players, isSuccess, isLoading } = useFetchPlayersQuery(search);
  if (!isSuccess || isLoading) return null;
  return (
    <>
      <div className="flex flex-wrap -m-4">
        {players.data.map((player) => (
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
        totalRows={players.info.totalRows}
        offset={players.info.offsetRows}
        route="players"
      />
    </>
  );
};

export default PlayerList;
