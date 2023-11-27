import Footer from "@/components/global/footer";
import Header from "@/components/global/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default layout;
