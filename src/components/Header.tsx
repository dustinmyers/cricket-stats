import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
  const playerSearch = async (formData: FormData) => {
    "use server";
    const res = await fetch(
      `https://api.cricapi.com/v1/players?apikey=${
        process.env.NEXT_PUBLIC_CRICKET_API_KEY
      }&offset=0&search=${formData.get("search")}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(await res.json());
    return res.json();
  };
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="flex gap-3 items-center">
            <Image
              src="https://h.cricapi.com/img/icon512.png"
              alt="Cricket Icon"
              width={50}
              height={50}
            />
            <h1 className="text-lg font-bold">Cricket Stats</h1>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <form action={playerSearch}>
                <input name="search" className="text-black" />
              </form>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-indigo-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/matches?offset=0"
                className="hover:text-indigo-300 transition-colors"
              >
                Matches
              </Link>
            </li>
            <li>
              <Link
                href="/players"
                className="hover:text-indigo-300 transition-colors"
              >
                Players
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
