import Header from "../Header";
import Footer from "../Footer";

const GlobalLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-10">{children}</main>
      <Footer />
    </>
  );
};

export default GlobalLayout;
