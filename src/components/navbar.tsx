import Link from "next/link";

import { Container } from "./container";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}

          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-foreground"
          >
            Chronicle
          </Link>

          {/* Navigation */}

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Home
            </Link>

            <Link
              href="/blog"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              Articles
            </Link>

            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              About
            </Link>
          </nav>

          {/* Right Actions */}

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-border px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 md:block">
              Subscribe
            </button>

            <button className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              Sign in
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}