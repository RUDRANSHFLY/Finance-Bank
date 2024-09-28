import { getLoggedInUser } from "@/actions/user.actions";
import NavBar from "@/components/navbar/NavBar";
import RightSideBar from "@/components/navbar/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import React from "react";

const Home = async () => {
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

  const loggedInUser = await getLoggedInUser();

  return (
    <div>
      <h1>Home Page</h1>
      {/* <section className={"home"}>
        <div className={"home-content"}>
          <header className={"home-header"}>
            <NavBar
              type={headerType}
              tiitle={headerTitle}
              user={loggedInUser?.name || "Guest"}
              subTitle={headerSubTitle}
            />
            <TotalBalanceBox
              account={[]}
              totalBanks={mainTotalBalanceBox.mainTotalBanks}
              totalCurrentBalance={mainTotalBalanceBox.mainTotalCurrentBalance}
            />
          </header>
          RECENT TRANSACTION
        </div>
        <RightSideBar
          transactions={[]}
          banks={[{ currentBalance: 1500 }, {}]}
          bank={[{}, {}]}
          user={{
            name: loggedInUser?.name,
            $id: "",
            email: loggedInUser?.email,
            userId: "",
            dwollaCustomerUrl: "",
            dwollaCustomerId: "",
            firstName: loggedInUser?.firstName,
            lastName: loggedInUser?.lastName,
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
          }}
        />
      </section> */}
    </div>
  );
};

export default Home;
