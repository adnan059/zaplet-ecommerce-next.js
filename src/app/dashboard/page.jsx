import DashboardContainer from "@/components/sections/dashboard/DashboardContainer";
import getCurrentUser from "@/lib/server-actions/auth-action";
import Image from "next/image";

export default async function Page() {
  const currentUser = await getCurrentUser();
  return (
    <section className="dashboard">
      <div className="sectionContainer">
        <div className="adminInfo">
          <h3>{currentUser?.name}</h3>
          <Image
            src={currentUser?.image}
            height={40}
            width={40}
            alt="admin-image"
          />
        </div>
        <DashboardContainer />
      </div>
    </section>
  );
}
