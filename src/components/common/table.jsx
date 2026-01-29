export default function ComparisonTable() {
  const tableData = [
    {
      category: 'Speed',
      dsqr: "Lightning-fast edits. First drafts in 1-2 business days, unlimited revisions until it's perfect.",
      freelancer: '3-5 days, varies',
      inHouse: '1-2 days depending on load',
      traditional: '7-10+ days turnaround',
      diy: "Slow - you're doing it all",
    },
    {
      category: 'Cost',
      dsqr: '$300-$700/mo, unlimited requests',
      freelancer: '$2k-$1k/month',
      inHouse: '$4k-$6k/month + benefits',
      traditional: '$4k-$6k/month + benefits',
      diy: '$4k-$6k/month + benefits',
    },
    {
      category: 'Reliability',
      dsqr: 'Dedicated Project Manager and a team of editors',
      freelancer: 'Inconsistent, depends on availability',
      inHouse: 'High - if well-managed',
      traditional: 'High - but rigid',
      diy: "Low - you'll drop the ball",
    },
    {
      category: 'Workflow',
      dsqr: 'Streamlined with Personalized Dashboard',
      freelancer: 'Email threads & management',
      inHouse: 'You build the process',
      traditional: 'You follow theirs',
      diy: 'A mess of folders and timelines',
    },
    {
      category: 'Expertise',
      dsqr: 'Vetted editors + optional AI support',
      freelancer: 'Hit or miss',
      inHouse: 'Depends on training',
      traditional: 'Unclear until after project',
      diy: "Let's just say... you're learning",
    },
    {
      category: 'Scalability',
      dsqr: 'Easy to upgrade or add services',
      freelancer: 'Hard - freelancers max out',
      inHouse: 'Limited to 40 hrs/week',
      traditional: 'Medium -scaling costs more',
      diy: "Not scalable - you're the limit",
    },
    {
      category: 'Onboarding',
      dsqr: 'Same-day start, no long-term commitment',
      freelancer: '1-2 weeks to align',
      inHouse: '2-6 weeks + hiring',
      traditional: '2-4 weeks onboarding in',
      diy: 'No onboarding, just dive in',
    },
    {
      category: 'Support',
      dsqr: 'Response within an hour during workdays',
      freelancer: 'Varies greatly',
      inHouse: 'Internal - if you have bandwidth',
      traditional: '24-48 hours turnaround',
      diy: "You're the support desk",
    },
  ]

  const cols = [
    { key: 'category', label: 'Category', width: 120 },
    { key: 'dsqr', label: 'DSQR Studio', width: 256 },
    { key: 'freelancer', label: 'Freelancer', width: 256 },
    { key: 'inHouse', label: 'In-House Hire', width: 256 },
    { key: 'traditional', label: 'Traditional Agency', width: 256 },
    { key: 'diy', label: 'DIY (Do It Yourself)', width: 256 },
  ]

  // build the grid template string (160px repeat(5,256px))
  const gridTemplate = `${cols[0].width}px repeat(5, ${cols[1].width}px)`

  return (
    <div className="lg:px-8 px-4 py-0 max-w-7xl mx-auto overflow-x-hidden">
      {/* Header Section (unchanged) */}
      <div className="mb-8 lg:text-left">
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              RISK-FREE PROMISE
            </span>
          </div>
          <span>
            <hr className="text-gray-900 border-gray-300" />
          </span>
        </div>

        <div className="md:text-center mt-5 lg:mt-8 lg:mb-8 mb-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-left md:text-center tracking-tight">
            <em className="font-extralight font-instrument-italic">Creative</em>{' '}
            Without the Commitment
          </h2>

          {/* Subtext */}
          {/* <p className="mt-4 text-gray-700 md:text-lg max-w-2xl mx-auto text-left md:text-center">
No contracts, no lock-ins. Pause, upgrade, or cancel anytime .    </p> */}

          {/* Checklist */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-4 md:gap-10 mt-6 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <span className="bg-black text-[var(--color-primary)] w-8 h-8 text-xl rounded-full flex items-center justify-center">
                ✓
              </span>
              No contracts
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-black text-[var(--color-primary)] w-8 h-8 text-xl rounded-full flex items-center justify-center">
                ✓
              </span>
              No lock-ins
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-black text-[var(--color-primary)] w-8 h-8 text-xl rounded-full flex items-center justify-center">
                ✓
              </span>
              Pause, Upgrade, or Cancel Anytime
            </p>
          </div>

          {/* Highlighted Strip */}
          <div className="relative w-screen left-1/2 -translate-x-1/2 mt-8">
            <div className="bg-[var(--color-primary)] sm:py-3 py-1 px-6 font-semibold text-center text-lg md:text-3xl">
              Because your{' '}
              <em className="font-instrument-italic font-light">
                Peace of Mind
              </em>{' '}
              Matters as much as your Visuals.
            </div>
          </div>
          <p className="text-black font-medium md:text-xl mb-8 mt-4 text-center md:mt-8">
            DSQR vs. Typical Agencies / Freelancers / Employee / Do it yourself
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-primary rounded-lg shadow-lg overflow-hidden max-w-7xl mx-auto">
        {/* Desktop Table unchanged */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">DSQR Studio</th>
                <th className="text-left py-4 px-6 font-medium">Freelancer</th>
                <th className="text-left py-4 px-6 font-medium">
                  In-House Hire
                </th>
                <th className="text-left py-4 px-6 font-medium">
                  Traditional Agency
                </th>
                <th className="text-left py-4 px-6 font-medium">
                  DIY (Do It Yourself)
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-primary'}
                >
                  <td className="py-4 px-6 font-medium text-gray-900 border-r border-gray-200">
                    {row.category}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {row.dsqr}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {row.freelancer}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {row.inHouse}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    {row.traditional}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700">{row.diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: sticky first column + horizontally scrollable other columns */}
        <div className="lg:hidden">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Header Row */}
              <div
                className="grid"
                style={{ gridTemplateColumns: gridTemplate }}
              >
                {/* First header cell (sticky) */}
                <div
                  className="sticky left-0 z-40 bg-gray-900 text-white font-medium px-4 py-4 border-b border-gray-200 flex items-center"
                  style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
                >
                  Category
                </div>

                {/* Other header cells */}
                {cols.slice(1).map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 text-white font-medium px-4 py-4 border-b border-gray-200 flex items-center"
                  >
                    {c.label}
                  </div>
                ))}
              </div>

              {/* Data Rows */}
              {tableData.map((row, rowIndex) => {
                const rowBg = rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-primary'
                return (
                  <div
                    key={rowIndex}
                    className={`grid ${rowBg}`}
                    style={{ gridTemplateColumns: gridTemplate }}
                  >
                    {/* Sticky category cell (matches row bg) */}
                    <div
                      className={`sticky left-0 z-30 px-4 py-4 font-medium text-gray-900 border-b border-gray-200 flex items-center`}
                      style={{
                        background:
                          rowBg === 'bg-gray-50' ? '#F9FAFB' : '#FFFFFF',
                        borderRight: '1px solid rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className="whitespace-pre-wrap">{row.category}</div>
                    </div>

                    {/* Other cells (scrollable) */}
                    <div className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                      <div className="whitespace-pre-wrap">{row.dsqr}</div>
                    </div>
                    <div className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                      <div className="whitespace-pre-wrap">
                        {row.freelancer}
                      </div>
                    </div>
                    <div className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                      <div className="whitespace-pre-wrap">{row.inHouse}</div>
                    </div>
                    <div className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                      <div className="whitespace-pre-wrap">
                        {row.traditional}
                      </div>
                    </div>
                    <div className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 flex items-center">
                      <div className="whitespace-pre-wrap">{row.diy}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
