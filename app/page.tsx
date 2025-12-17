import Image from "next/image";
import SignupBtn from "@/components/SignupBtn";
import LoginBtn from "@/components/LoginBtn";
import NotesImage from '@/components/notes.png';
import FeaturesList from "@/components/FeaturesList";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Head */}
      <section>
        <div className="bg-green-200">
          <div className="flex items-center justify-between max-w-3xl mx-auto mt-5 p-3">
            <div className="text-1xl lg:text-2xl font-bold transition-all">
              Personal-notes <span className="italic text-sm rotate-6 underline bg-green-400 p-2">by MR</span>
            </div>
            <div className="flex space-x-2.5 max-md:hidden">
              <a className="hover:underline cursor-pointer">
                FAQ
              </a>
              <a href="#features" className="hover:underline cursor-pointer">
                features
              </a>
            </div>
            <div className="flex space-x-2">
              <div>
                <SignupBtn />
              </div>
              <div>
                <LoginBtn />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white via-green-200 to-white">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mt-5 p-3">
          <div className="text-3xl min-md:text-5xl transition-all font-bold p-1">
            Start <span className="bg-green-400 p-1 rounded">Taking Notes</span> - It's Free
          </div>
          <div className="text-sm min-md:text-xl max-md:hidden opacity-85">
            Access your notes on any device, anytime. Your ideas are always with you.
          </div>
          <div className="mt-10 font-bold">
            Everything you get in:
          </div>
          <div>
            <Image width={500} height={500} src={NotesImage} alt="Notes-image" className="shadow-lg saturate-100 m-4 p-2 shadow-green-500" />
          </div>
          <div className="flex flex-col justify-center text-2xl md:text-5xl items-center mb-2 mt-5">
            <div className="tracking-tighter">
              CREATE YOUR <span className="font-bold">FREE</span> ACCOUNT NOW
            </div>
          </div>

          <div className="mx-auto text-center text-sm text-green-700 opacity-90 max-w-3xl max-md:text-1xl">
            I finally feel like my random thoughts are adding up to something.
            This platform is perfect for students, researchers, and anyone serious about learning. — MRahman
          </div>
          <div className="mt-2 ">
            <SignupBtn />
          </div>

        </div>
      </section>
      {/* Features */}
      <section id="features" className="mb-20">
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto mt-20 p-3">
          <div className="uppercase px-3 font-semibold rounded text-green-700 text-2xl overline">
            Features
          </div>
          <div className="max-md:text-3xl text-5xl transition-all uppercase p-5 mb-8 font-bold">
            Your New Workflow
          </div>
          <div className="bg-green-200 p-10 rounded">
            <ul className="space-y-2 max-md:font-semibold">
              <FeaturesList>Seamless Sync & Universal Access</FeaturesList>
              <FeaturesList>Powerful, Hyper-Speed Search</FeaturesList>
              <FeaturesList>The Ultimate Distraction-Free Editor</FeaturesList>
              <FeaturesList>Complete Privacy & Security</FeaturesList>
            </ul>
          </div>
        </div>
      </section>
      {/* footer */}
      <section className="bg-gradient-to-b from-white via-green-200/40 to-white py-10">
        <div className="max-w-4xl mx-auto p-4 md:flex justify-between gap-10">

          {[
            {
              title: "Navigation",
              links: [
                { name: "Home", href: "/" },
                { name: "Features", href: "/features" }
              ],
            },
            {
              title: "Quick Links",
              links: [
                { name: "Sign Up", href: "/signup" },
                { name: "Login", href: "/login" },
                { name: "Dashboard (if logged in)", href: "/dashboard" }
              ],
            },
            {
              title: "Connect with Maker",
              links: [
                { name: "Instagram", href: "https://instagram.com" },
                { name: "Twitter", href: "https://twitter.com" },
                { name: "YouTube", href: "https://youtube.com" },
                { name: "Threads", href: "https://threads.net" }
              ],
            },
          ].map((group, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-2xl text-green-950 mb-2">{group.title}</h3>
              <ul className="space-y-1 mb-5">
                {group.links.map((link, i) => (
                  <li
                    key={i}
                    className="opacity-60 hover:opacity-100 font-semibold cursor-pointer transition"
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
        <div className="font-bold max-w-3xl mx-auto flex items-center justify-center underline">
          Created by MRahman😴 <span className="italic opacity-30 text-sm p-2">built with lots of love, skipping integration and diffrentiation.</span>
        </div>
      </section>

    </>
  );
}
