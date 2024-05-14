import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";

interface PlayerStat {
  fn: string; // function name like 'batting' or 'bowling'
  matchtype: string; // type of the match e.g., 't20i'
  stat: string; // statistic name e.g., 'runs', 'wkts'
  value: string; // value of the statistic
}

interface Player {
  id: string;
  name: string;
  dateOfBirth: string;
  role: string;
  battingStyle: string;
  placeOfBirth: string;
  country: string;
  playerImg: string;
  stats: PlayerStat[];
}

interface PlayerData {
  apikey: string;
  data: Player;
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

const getPlayerData = async (playerId: string): Promise<PlayerData> => {
  const res = await fetch(
    `https://api.cricapi.com/v1/players_info?apikey=${process.env.NEXT_PUBLIC_CRICKET_API_KEY}&id=${playerId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const PlayerProfile: NextPage<{ params: { playerId: string } }> = async ({
  params,
}) => {
  const { data: player } = await getPlayerData(params.playerId);

  return (
    <section className="flex flex-col items-center p-10 gap-10">
      <h1 className="text-3xl font-bold text-center">Player Profile</h1>
      <Image
        src={player.playerImg}
        alt={player.name}
        width={200}
        height={200}
        className="rounded-full"
      />
      <h2 className="text-xl">{player.name}</h2>
      <div className="text-lg">
        <p>Country: {player.country}</p>
        <p>Date of Birth: {player.dateOfBirth}</p>
        <p>Place of Birth: {player.placeOfBirth}</p>
        <p>Role: {player.role}</p>
        <p>Batting Style: {player.battingStyle}</p>
      </div>
      <div className="w-full">
        <h3 className="text-2xl font-semibold">Statistics</h3>
        {player.stats?.map((stat, index) => (
          <div key={index} className="flex justify-between p-2 border-b">
            <span>{`${stat.fn} (${stat.matchtype}) - ${stat.stat}`}</span>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayerProfile;
