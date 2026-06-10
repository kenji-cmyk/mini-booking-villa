export function Footer() {
  return (
    <footer className="bg-ocean-900 text-white">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-bold">VStay</h2>
          <p className="mt-3 text-sm leading-6 text-white/70">Curated villas for calm coastal escapes and reliable booking.</p>
        </div>
        {[
          ["Explore", "Villas", "Destinations", "Offers"],
          ["Company", "About", "Careers", "Partners"],
          ["Support", "Help Center", "Payment", "Contact"]
        ].map(([title, ...items]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/80">{title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              {items.map((item) => (
                <li key={item}>
                  <a className="hover:text-white" href="#top">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
