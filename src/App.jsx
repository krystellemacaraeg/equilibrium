// src/App.jsx - updated to pass ledger down as props
import { useState } from "react";
import Header from "./components/Header";
import InputPane from "./components/InputPane";
import SummaryPane from "./components/SummaryPane";
import { useLedger } from "./hooks/useLedger";

export default function App() {
  const [hideButtons, setHideButtons] = useState(false);
  // Calling useLedger once here and passing data down to both panes
  const ledger = useLedger();

  return (
    <div className="min-h-screen bg-[#0a0c14] relative">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-green-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header hideButtons={hideButtons} setHideButtons={setHideButtons} />

        <main className="flex flex-col lg:flex-row flex-1 gap-6 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
          <section className="flex-1 min-w-0">
            <InputPane hideButtons={hideButtons} ledger={ledger} />
          </section>
          <aside className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-8 lg:self-start">
            <SummaryPane ledger={ledger} />
          </aside>
        </main>

        <div className="lg:hidden sticky bottom-0 z-20">
          <SummaryPane ledger={ledger} isMobileFooter />
        </div>
      </div>
    </div>
  );
}