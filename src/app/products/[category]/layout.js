import Categories from "@/components/sections/categories/Categories";

export default function Layout({ children }) {
  return (
    <>
      <section className="pt-[95px]">
        <div className="sectionContainer">
          <Categories />
        </div>
      </section>
      {children}
    </>
  );
}
