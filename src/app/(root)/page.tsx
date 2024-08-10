import NavBar from "@/components/navbar/NavBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = () => {
  const headerType = "greeting";
  const headerTitle = "Welcome";
  const headerUser = {
    name: "Ghost",
  };

  const mainTotalBalanceBox = {
    mainAccount: [],
    mainTotalBanks: 5,
    mainTotalCurrentBalance: 1999,
  };

  const headerSubTitle =
    "Access and manage your account and transactions efficiently";

  return (
    <div>
      <section className={"home"}>
        <div className={"home-content"}>
          <header className={"home-header"}>
            <NavBar
              type={headerType}
              tiitle={headerTitle}
              user={headerUser?.name || "Guest"}
              subTitle={headerSubTitle}
            />
            <TotalBalanceBox
              account={[]}
              totalBanks={mainTotalBalanceBox.mainTotalBanks}
              totalCurrentBalance={mainTotalBalanceBox.mainTotalCurrentBalance}
            />
          </header>
        </div>
      </section>
    </div>
  );
};

export default Home;
