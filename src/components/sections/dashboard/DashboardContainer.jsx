import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardProducts from "./DashboardProducts";
import DashboardOrders from "./orders/DashboardOrders";

const DashboardContainer = () => {
  return (
    <div>
      <Tabs defaultValue="orders">
        <TabsList className={"dashboardTabList"}>
          <TabsTrigger className={"dashboardTabsTrigger"} value="orders">
            Orders
          </TabsTrigger>
          <TabsTrigger className={"dashboardTabsTrigger"} value="products">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <DashboardOrders />
        </TabsContent>
        <TabsContent value="products">
          <DashboardProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardContainer;
