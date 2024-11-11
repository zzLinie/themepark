import AdminHeader from "../components/adminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./DataEntryForm.css";

const ParkStatusForm = () => {
  const [ParkStatusData, setParkStatusData] = useState({
    parkStatusDate: "",
    weatherType: "",
  });

  const [parkStatusList, setParkStatusList] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkHistoryList, setParkHistoryList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParkStatusData({ ...ParkStatusData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ParkStatusData.weatherType === "2") {
      const confirm = window.confirm(
        "You are about to input this date as a RAINOUT. Double check the date before proceeding"
      );
      if (!confirm) {
        return;
      }
    }
    try {
      const response = await axios.post(
        "https://themepark-backend.onrender.com/parkstatus/create",
        ParkStatusData
      );
      if (response.data.message) {
        alert(response.data.message);
      }
      await getParkStatus();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const getParkStatus = () => {
    axios
      .get("https://themepark-backend.onrender.com/parkstatus/read")
      .then((res) => setParkStatusList(res.data.result))
      .catch((err) => console.error(err));
  };

  const getParkHistory = () => {
    axios
      .get("https://themepark-backend.onrender.com/parkstatus/readhistory")
      .then((res) => setParkHistoryList(res.data.result))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getParkStatus();
  }, []);

  const getWeatherDescription = (weatherType) => {
    switch (weatherType) {
      case 0:
        return "Fair";
      case 1:
        return "Cloudy";
      case 2:
        return "Rainout";
      default:
        return "Not input";
    }
  };

  const getWeatherStyle = (weatherType) => {
    if (weatherType === 2) {
      return { color: "red" };
    }
    return {};
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-CA");
  };

  const openModal = (row) => {
    setEditRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditRow(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://themepark-backend.onrender.com/parkstatus/update`,
        editRow
      );
      if (response.data.message) {
        alert(response.data.message);
      }
      await getParkStatus();
      closeModal();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="dataentryformcontainer">
        <h1>Add Park Operating Day</h1>
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            name="parkStatusDate"
            value={ParkStatusData.parkStatusDate}
            onChange={handleChange}
            required
          />

          <label>Weather Type</label>
          <select
            name="weatherType"
            value={ParkStatusData.weatherType}
            onChange={handleChange}
            required
          >
            <option value="">Select Weather Type</option>
            <option value="0">Fair</option>
            <option value="1">Cloudy</option>
            <option value="2">Rainout</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <h2>Upcoming Park Days</h2>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather Type</th>
              <th>Capacity</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
              <th>Edit</th>
            </tr>
          </thead>
          {parkStatusList &&
            parkStatusList.map((val, key) => (
              <tbody key={key}>
                <tr>
                  <td>{formatDate(val.date)}</td>
                  <td style={getWeatherStyle(val.weatherType)}>
                    {getWeatherDescription(val.weatherType)}
                  </td>
                  <td>{val.capacity}</td>
                  <td>{val.openingTime}</td>
                  <td>{val.closingTime}</td>
                  <td>
                    <button type="button" onClick={() => openModal(val)}>
                      Edit
                    </button>
                    <button type="button" onClick={() => modalRef.current.close()}>
                      Close
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Park Operating Day"
      >
        <h2>Edit Park Operating Day</h2>
        {editRow && (
          <form onSubmit={handleUpdate}>
            <label>Date</label>
            <input
              type="date"
              name="parkStatusDate"
              value={editRow.parkStatusDate}
              onChange={(e) =>
                setEditRow({ ...editRow, parkStatusDate: e.target.value })
              }
              required
            />

            <label>Weather Type</label>
            <select
              name="weatherType"
              value={editRow.weatherType}
              onChange={(e) =>
                setEditRow({ ...editRow, weatherType: e.target.value })
              }
              required
            >
              <option value="">Select Weather Type</option>
              <option value="0">Fair</option>
              <option value="1">Cloudy</option>
              <option value="2">Rainout</option>
            </select>
            <button type="submit">Update</button>
          </form>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
};

export default ParkStatusForm;


 /* return (
    <>
      <AdminHeader />
      <div className="dataentryformcontainer">
        <h1>Edit Park Operating Day</h1>
        <form onSubmit={handleSubmit}>
          <label>Date</label>
          <input
            type="date"
            name="parkStatusDate"
            value={ParkStatusData.parkStatusDate}
            onChange={handleChange}
            required
          />

          <label>Weather Type</label>
          <select
            name="weatherType"
            value={ParkStatusData.weatherType}
            onChange={handleChange}
            required
          >
            <option value="">Select Weather Type</option>
            <option value="0">Fair</option>
            <option value="1">Cloudy</option>
            <option value="2">Rainout</option>
          </select>
          <button type="submit">Submit</button>
        </form>
      </div>
      <h2>Upcoming Park Days</h2>
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Weather Type</th>
              <th>Capacity</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
              <th>Edit</th>
            </tr>
          </thead>

          {parkStatusList &&
            parkStatusList.map((val, key) => {
              return (
                <>
                  <tbody key={key}>
                    <tr>
                      <td>{formatDate(val.date)}</td>
                      <td style={getWeatherStyle(val.weatherType)}>
                        {getWeatherDescription(val.weatherType)}
                      </td>
                      <td>{val.capacity}</td>
                      <td>{val.openingTime}</td>
                      <td>{val.closingTime}</td>
                      <td>    
                      <button type="submit" onClick={handleUpdate}>
                      Update
                      </button>
                      <button type="button" onClick={() => modalRef.current.close()}>
                       Close
                      </button>
                      </td>
                    </tr>
                  </tbody>
                </>
                
              );
            })}
            
        </table>
      </div>
    </>
  );
};
*/