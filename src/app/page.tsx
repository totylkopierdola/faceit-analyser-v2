import BackgroundShapes from "@/components/BackgroundShapes";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 h-[calc(100vh-4rem)]">
      <BackgroundShapes color="bg-orange-500" opacity="opacity-20" />
      <div className="mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-26 justify-center">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8 z-10">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <ol className="flex text-xs flex-col ">
              <li>- news section</li>
              <li>- live matches</li>
              <li>- faceit leaderboard</li>
              <li>- find team/player section</li>
              <li>- Contact page (maybe modal)</li>
            </ol>
            <Link href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                What&apos;s coming:
              </span>
              <br />
              {/* make all these separate <p></p> tags: [-news section -live matches -faceit leaderboard -find team/player section -chat for found player] */}

              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                <span>v1.0</span>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Find player statistics
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            type the player&apos;s nickname and get the data
          </p>
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
