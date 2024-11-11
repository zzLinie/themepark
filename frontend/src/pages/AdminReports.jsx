// import "./adminReports.css";
// import AdminHeader from "../components/adminHeader";

// export default function AdminReports() {
//   return (
//     <div>
//       <AdminHeader />
//       <div className="reports">
//         <div className="popular-rides">Rides</div>
//         <ReportCard reportHeading={"Customer visit"} />
//         <ReportCard reportHeading={"Ride maintenance"} />
//         {/* Embed Looker Studio Report
//         <iframe
//           src="https://lookerstudio.google.com/embed/reporting/05d5374d-5f4f-4228-9272-962b49da6639/page/6zXD"
//           width="100%"
//           height="600px"
//           frameBorder="0"
//           allowFullScreen
//         ></iframe> */}
//       </div>
//     </div>
//   );
// }
// Adminreports.jsx
// Adminreports.jsx
import React, { useEffect, useState } from "react";
import "./Adminreports.css";

const Adminreports = () => {
  const [reportData, setReportData] = useState({
    maintenanceData: [],
    visitData: [],
    ticketSalesData: [],
    shopTransactionsData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [rideNameFilter, setRideNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reports/maintenance-report");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const data = await response.json();
        setReportData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Apply filters to the maintenance and visit data
  const filteredMaintenanceData = reportData.maintenanceData.filter(row =>
    row.rideName.toLowerCase().includes(rideNameFilter.toLowerCase())
  );

  const filteredVisitData = reportData.visitData.filter(row =>
    row.rideName.toLowerCase().includes(rideNameFilter.toLowerCase()) &&
    (!dateFilter || row.Date.includes(dateFilter))
  );

  return (
    <div className="admin-reports">
      <h1>Admin Reports</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Ride Name"
          value={rideNameFilter}
          onChange={(e) => setRideNameFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Maintenance Data Table */}
      <section>
        <h2>Maintenance Data</h2>
        <table>
          <thead>
            <tr>
              <th>Ride ID</th>
              <th>Ride Name</th>
              <th>Status</th>
              <th>Open Date</th>
              <th>Close Date</th>
              <th>Technician First Name</th>
              <th>Technician Last Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaintenanceData.map((row) => (
              <tr key={row.rideID}>
                <td>{row.rideID}</td>
                <td>{row.rideName}</td>
                <td>{row.maintenanceStatus}</td>
                <td>{row.maintenanceOpenDate}</td>
                <td>{row.maintenanceCloseDate}</td>
                <td>{row.Fname}</td>
                <td>{row.Lname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Visit Data Table */}
      <section>
        <h2>Visit Data</h2>
        <table>
          <thead>
            <tr>
              <th>Visit ID</th>
              <th>Ride Name</th>
              <th>Ride ID</th>
              <th>Visit Count</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitData.map((row) => (
              <tr key={row.visitID}>
                <td>{row.visitID}</td>
                <td>{row.rideName}</td>
                <td>{row.rideID}</td>
                <td>{row.visitCount}</td>
                <td>{row.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Other sections remain the same */}
    </div>
  );
};

export default Adminreports;

