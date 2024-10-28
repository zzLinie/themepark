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
        <ReportCard reportHeading={"Ride maintenance"} />
        {/* Embed Looker Studio Report */}
        <iframe
          src="https://lookerstudio.google.com/embed/reporting/05d5374d-5f4f-4228-9272-962b49da6639/page/6zXD"
          width="100%"
          height="600px"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}