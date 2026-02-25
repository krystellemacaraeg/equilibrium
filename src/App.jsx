import { useState } from "react";
import Header from "./components/Header";
import InputPane  from "./components/InputPane";
import SummaryPane from "./components/SummaryPane";

// Root component - this is where the two-pane layout is controlled
export default function App() {
  // hideButtons state lives here so both panes can react to it
  const [hideButtons, setHideButtons] = useState(false);

  return (
    // min-h-screen keeps the background from cutting short on sparse pages
    <div className="min-h-screen bg-[#0a0c14] relative">

      {/* Ambient background blobs - just decorative, pointer-events-none so they don't block clicks */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-green-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Main content wrapper - z-10 so it sits above the blobs */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header hideButtons={hideButtons} setHideButtons={setHideButtons} />

        {/*
          THE CORE RESPONSIVE LAYOUT:
          - Mobile (default): flex-col stacks InputPane on top, SummaryPane below
          - Desktop (lg+): flex-row puts InputPane on the left, SummaryPane fixed on the right
          px-4 on mobile, bigger padding on larger screens
        */}
        <main className="
          flex flex-col lg:flex-row
          flex-1
          gap-6
          px-4 py-6
          lg:px-8 lg:py-8
          max-w-7xl mx-auto w-full
        ">
          {/* Left pane - grows to fill available space */}
          <section className="flex-1 min-w-0">
            <InputPane hideButtons={hideButtons} />
          </section>

          {/*
            Right pane - fixed width on desktop.
            On mobile this just flows naturally in the column.
            lg:sticky keeps the summary visible as the user scrolls through long input lists.
          */}
          <aside className="
            w-full lg:w-80 xl:w-96
            lg:sticky lg:top-8
            lg:self-start
          ">
            <SummaryPane />
          </aside>
        </main>

        {/*
          MOBILE STICKY FOOTER - only shows on small screens (lg:hidden).
          This gives mobile users a persistent summary without scrolling.
        */}
        <div className="lg:hidden sticky bottom-0 z-20">
          <SummaryPane isMobileFooter />
        </div>
      </div>
    </div>
  );
}