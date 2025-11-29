import Image from "next/image";

export default function Home() {
  return (
   <section>
    <div className="bg-green-200 pb-6 pt-1">
      <div className="flex items-center justify-between max-w-3xl mx-auto mt-5 p3">
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
            signup btn
          </div>
          <div>
            login btn
          </div>
        </div>
      </div>
    </div>
   </section>
  );
}
