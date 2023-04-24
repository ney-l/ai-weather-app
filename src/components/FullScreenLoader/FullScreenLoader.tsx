import { SunIcon } from '@heroicons/react/solid'

export const FullScreenLoader = () => {
  return (
    <div className="bg-gradient-to-br min-h-screen flex flex-col items-center justify-center text-slate-500">
      <SunIcon
        className="h-24 w-24 animate-bounce text-yellow-500"
        color="yellow"
      />
      <h1 className="text-6xl font-bold text-center mb-10 animate-pulse">
        Loading Weather
      </h1>
      <h2 className="text-xl font-bold text-center mb-10 animate-pulse">
        {`Hang tight, we're gathering intel on the weather and cooking up an AI-powered rundown of the weather!`}
      </h2>
    </div>
  )
}
