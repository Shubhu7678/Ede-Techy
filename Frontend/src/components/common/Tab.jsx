export default function Tab({ tabData, field, setField }) {
    return (
      <div className="mb-7 flex w-max max-w-full gap-x-1 rounded-full border border-white/10 bg-richblack-900/60 p-1">
        {tabData.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={`rounded-full px-6 py-2 text-sm transition-all duration-300 ${
              field === tab.type
                ? "bg-gradient-to-b from-yellow-25 to-yellow-100 font-semibold text-richblack-900 shadow-[0_8px_24px_-8px_rgba(232,196,104,0.7)]"
                : "text-richblack-100 hover:text-yellow-25"
            }`}
          >
            {tab?.tabName}
          </button>
        ))}
      </div>
    );
}
