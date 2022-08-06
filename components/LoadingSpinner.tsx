export default function LoadingSpinner() {
    ///{ showText = true }
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-10 items-center justify-center rounded border border-slate-500 bg-slate-700 p-2 text-sm text-gray-100">
                <svg fill="none" className="animate-spin-med h-10 w-auto" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path
                        clipRule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fillRule="evenodd"
                    />
                </svg>
                <div className="font-normal">Loading....</div>
            </div>
        </div>
    );
}
