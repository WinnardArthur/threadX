import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  OrganizationSwitcher,
} from "@clerk/nextjs/app-beta";

function Topbar() {
  return (
    <nav className="">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threadx</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignedOut>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignedOut>
          </SignedIn>

          <OrganizationSwitcher
            appearance={{
              elements: { organizationSwitcherTrigger: "py-2 px-4" },
            }}
          />
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
