import Categories from "@/components/sections/categories/Categories";
import Hero from "@/components/sections/hero/Hero";
import ProductsForHomePage from "@/components/sections/products/ProductsForHomePage";

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <section>
        <div className="sectionContainer">
          <Hero />
        </div>
      </section>
      <section>
        <div className="sectionContainer">
          <Categories />
        </div>
      </section>
      <section>
        <div className="sectionContainer">
          <ProductsForHomePage sp={sp} />
        </div>
      </section>
    </>
  );
}

// in this ecommerce site, the customers dont need to create an account.
// they will select products and add them to cart.
// they will be able to checkout and place the order just by entering their details like name, address, phone number etc.
// the customers will have to pay cash on delivery. no need to integrate payment methods.
// for admin, they will login via gmail and will be able to add products, remove products, update products etc.
// the .env file will have gmail addresses of admins. when an admin tries to login via gmail, i will check if that gmail is present in the .env file. if it is present, i will let the admin enter the admin section of app and allow him to perform sensitive tasks
// when an order is placed i will give the customer a downloadable reciept.
