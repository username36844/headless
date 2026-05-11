import Link from "next/link";
import { Container } from "./container";
import { auth } from "@/auth";
import UserMenu from "@/components/user-menu";

export async function Navbar() {
  const session = await auth();

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
            <Link className="text-sm text-zinc-600 hover:text-black" href="/">
              Home
            </Link>

            <Link className="text-sm text-zinc-600 hover:text-black" href="/blog">
              Blog
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-black px-4 py-2 text-sm text-white"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}