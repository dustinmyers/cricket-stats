import Image from "next/image";
import Pagination from "@/components/Pagination";

interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}
interface MatchInfo {
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
}
interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  series_id: string;
  fantasyEnabled: boolean;
  bbbEnabled: boolean;
  hasSquad: boolean;
  matchStarted: boolean;
  matchEnded: boolean;
}
interface MatchesData {
  apiKey: string;
  unique_id: string;
  data: Match[];
  status: "success" | "error";
  info: MatchInfo;
}
async function getData(offset = "0"): Promise<MatchesData> {
  const res = await fetch(
    `https://api.cricapi.com/v1/matches?apikey=${process.env.NEXT_PUBLIC_CRICKET_API_KEY}&offset=${offset}`
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
  console.log(searchParams.offset);
  const { data: matches, info } = await getData(searchParams.offset);

  return (
    <section className="flex flex-col gap-10 p-20">
      <h1 className="text-xl text-center">Matches</h1>
      <div className="flex flex-wrap -m-4">
        {matches.map((match) => (
          <div className="p-4 md:w-1/3" key={match.id}>
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              {/* <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={match.image} alt="match image"> */}
              <div className="p-6">
                <h2 className="text-xl text-indigo-600 mb-6 font-bold">
                  {match.name} - {match.date}
                </h2>
                {match.teamInfo?.map((team, idx) => (
                  <div
                    className="flex justify-between items-center"
                    key={team.name}
                  >
                    <p className="leading-relaxed mb-5">
                      {team.name} ({team.shortname})
                    </p>
                    <div className="flex gap-2 items-center">
                      {match.score?.length > 0 ? (
                        <p>
                          {match.score?.[idx]?.r} - {match.score?.[idx]?.w}
                        </p>
                      ) : null}
                      <Image
                        src={team.img}
                        alt={team.name}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                ))}
                <p className="leading-relaxed mb-5">{match.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalRows={info.totalRows}
        offset={info.offsetRows}
        route="matches"
      />
    </section>
  );
}
