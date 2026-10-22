import Link from "next/link";
import { CartButton } from "@/components/cart/CartButton";
import { mainNav } from "@/data/site";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { whatsappLink } from "@/lib/whatsapp";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        {/* The logo is wide (about 4:1): smaller on narrow phones and beside the desktop nav at lg. */}
        <Logo className="h-7 min-[400px]:h-9 sm:h-12 lg:h-10 xl:h-12" preload />
        <DesktopNav items={mainNav} />
        <div className="flex items-center gap-2">
          <Link
            href="/contact/"
            className={buttonClasses("primary", "md", "max-[359px]:hidden!")}
          >
            Enquire
          </Link>
          <CartButton />
          <MobileNav items={mainNav} whatsappHref={whatsappLink()} />
        </div>
      </Container>
    </header>
  );
}
