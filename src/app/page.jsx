import Form1 from "@/components/Form1";
import Hello from "@/components/Hello";
import FirstSection from "@/components/Section";

export const metadata = {
  title: "Home",
  description: "This is a Home page",
};

export default function Home() {
  console.log("Hello world!");
  return (
    // <div>
    <>
      <FirstSection />
      <Form1 />
    </>

    // </div>
  );
}
