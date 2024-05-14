import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
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
