export default function Navbar() {
    return (
        <nav>
            <div className="h-24 grid grid-rows-2 md:grid-rows-1 md:grid-cols-5 w-full">
                <div className="hidden md:block md:col-span-2"></div>
                <h1 className="col-span-1 flex justify-center items-center text-4xl font-bold">
                    Advent!
                </h1>
                <div className="col-span-1 md:col-span-2 mx-6 flex flex-row justify-center md:justify-end items-center gap-3">
                    <a
                        className="text-blue-600 visited:text-purple-600"
                        href="https://decotrend.hu"
                        target="_blank"
                    >
                        Webáruház
                    </a>

                    <a
                        className="inline-flex w-full justify-center items-center gap-1 rounded-md border border-solid border-slate-600 px-3 py-2 text-gray shadow-sm hover:bg-slate-100 sm:ml-3 sm:w-auto"
                        href="mailto:muveszetesdekoracio@gmail.com"
                        target="_blank"
                    >
                        <div className="break-keep">Kérdésem van</div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    );
}
