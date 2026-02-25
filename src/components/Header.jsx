// Header with the app title and the Hide Buttons toggle
export default function Header({ hideButtons, setHideButtons }) {
    return (
        <header className="
            sticky top-0 z-30
            border-b border-white/5
            bg-[#0a0c14]/80 backdrop-blur-glass
            px-4 lg:px-8
            py-4
            ">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* App name + tagline */}
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        Equilibrium
                    </h1>
                    <p className="text-xs text-white/30 font-mono-num mt-0.5 hidden sm:block">
                    Financial Ledger
                    </p>
                </div>

                {/* Toggle to hide Add/Remove/Clear buttons for a cleaner read-only view */}
                <button 
                    onClick={() => setHideButtons(prev => !prev)}
                    className="
                        flex items-center gap-2
                        text-sm text-white/50 hover:text-white/80
                        transition-colors duration-200
                        px-3 py-1.5 rounded-lg
                        border border-white/10 hover:borrder-white/20
                        ">
                    {/* Simple icon swap instead of a library - keeps dependencies small*/}
                    <span>{hideButtons ? "📖" : "📕"}</span>
                    <span>{hideButtons ? "Show Buttons" : "Hide Buttons"}</span>
                    </button>
            </div>
        </header>
    );
}