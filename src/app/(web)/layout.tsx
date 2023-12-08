import Footer from "@/components/global/footer";
import Header from "@/components/global/header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default layout;
