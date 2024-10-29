import { title } from "@/components/primitives";

export default function DashboardPage() {
  return (
    <div>
      <h1 className={title()}>Dashboard</h1>

      <div className="view">Views</div>
      <div className="clicks">Clicks</div>
      <div className="comments">Comments</div>
    </div>
  );
}
