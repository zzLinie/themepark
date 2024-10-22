import "./adminReports.css";
import ReportCard from "../components/reportCard";
import AdminHeader from "../components/adminHeader";

export default function AdminReports() {
  return (
    <div>
      <AdminHeader />
      <div className="reports">
        <div className="popular-rides">Rides</div>
        <ReportCard reportHeading={"Customer visit"} />
        <ReportCard reportHeading={"ride maintenance"} />
      </div>
    </div>
  );
}
