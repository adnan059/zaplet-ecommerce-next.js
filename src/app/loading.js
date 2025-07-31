import { Loader } from "lucide-react";

export default function LoadingPage() {
  return (
    <section>
      <div className="sectionContainer ">
        <div className="loading">
          <Loader size={52} className="animate-spin" />
        </div>
      </div>
    </section>
  );
}
