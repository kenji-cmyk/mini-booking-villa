import { Button } from "@/components/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="text-2xl font-bold text-ocean-900" href="#top" aria-label="VStay home">
          VStay
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-neutral-700 md:flex" aria-label="Primary navigation">
          <a className="hover:text-primary-700" href="#villas">
            Explore Villas
          </a>
          <a className="hover:text-primary-700" href="#how-it-works">
            How It Works
          </a>
          <a className="hover:text-primary-700" href="#booking">
            My Bookings
          </a>
        </nav>
        <Button size="medium" variant="secondary">
          Sign In
        </Button>
      </div>
    </header>
  );
}
