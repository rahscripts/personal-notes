import Image from "next/image";
import SignupBtn from "@/components/SignupBtn";
import LoginBtn from "@/components/LoginBtn";
import NotesImage from '@/components/notes.png';

export default function Home() {
  return (
    <>
      <section>
        <div className="bg-green-200">
          <div className="flex items-center justify-between max-w-3xl mx-auto mt-5 p-3">
            <div className="text-1xl lg:text-2xl font-bold transition-all">
              Personal-notes <span className="italic text-sm rotate-6 underline bg-green-400 p-2">by MR</span>
            </div>
            <div className="flex space-x-2.5 max-md:hidden">
              <p className="hover:underline cursor-pointer">
                FAQ
              </p>
              <p className="hover:underline cursor-pointer">
                feedback
              </p>
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
          <div className="flex flex-col justify-center text-2xl md:text-4xl items-center mt-5">
            <div>
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
    </>
  );
}
