import AdminHeader from "../components/adminHeader";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./adminEmployees.css";
import "./DataEntryForm.css";

const ParkStatusForm = () => {
  const [ParkStatusData, setParkStatusData] = useState({
    parkStatusDate: "",
    weatherType: "",
  });
  const modalRef = useRef(null);
  const [parkStatusList, setParkStatusList] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [deleteState, setDeleteState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkHistoryList, setParkHistoryList] = useState([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParkStatusData({ ...ParkStatusData, [name]: value });
  };

  const handleChildData = (dataObj) => {
    setParkStatusData({ ...ParkStatusData, ...dataObj });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(parkStatusList.includes(ParkStatusData.date)) {
      const confirm = window.confirm(
        "The date you are trying to submit for already exists"
      );
      if (!confirm) {
        return;
      }
      return;
    }
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

  const getParkStatusData = (parkStatusID) => {
    axios
      .get(`https://themepark-backend.onrender.com/parkstatus/read/${parkStatusID}`)
      .then((res) => {
        setEditRow({ ...editRow, ...res.data.result });
        setParkStatusData({ ...ParkStatusData, ...res.data.result[0] });
        const modal = modalRef.current;
        modal.showModal();
      })
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

  const getTimeStyle = (time) =>  {
    if(time === null) {
      return {color: "red"};
    }
    return {};
  }

  const getOpenTime = (openingTime) =>   {
    switch(openingTime) {
      case null:
        return "CLOSED";
        default:
          return openingTime;
    }
  };

  const getCloseTime = (closingTime) =>   {
    switch(closingTime) {
      case null:
        return "CLOSED";
        default:
          return closingTime;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-TX");
  };

  const openModal = (row) => {
    setEditRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditRow(null);
    setIsModalOpen(false);
  };

  const openHistoryModal = () => { 
    getParkHistory();
    setIsHistoryModalOpen(true);
  }; 
  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://themepark-backend.onrender.com/parkstatus/update`, ParkStatusData)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
    setDeleteState(deleteState == true ? false : true);
  };

  /*const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://themepark-backend.onrender.com/parkstatus/update`,
        parkStatusData
      );
      if (response.data.message) {
        alert(response.data.message);
      }
      await getParkStatus();
      closeModal();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };*/
  
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
      <dialog ref={modalRef}>
        <form>
            <label>Date</label>
            <input
              type="date"
              name="parkStatusDate"
              value={parkStatusList.parkStatusDate}
              onChange={(e) =>
                setParkStatusData({ ...ParkStatusData, parkStatusDate: e.target.value })
              }
              required
            />

            <label>Weather Type</label>
            <select
              name="weatherType"
              value={parkStatusList.weatherType}
              onChange={(e) =>
                setParkStatusData({ ...ParkStatusData, weatherType: e.target.value })
              }
              required
            >
              <option value="">Select Weather Type</option>
              <option value="0">Fair</option>
              <option value="1">Cloudy</option>
              <option value="2">Rainout</option>
            </select>

          <button type="submit" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={() => modalRef.current.close()}>
            Close
          </button>
        </form>
      </dialog>
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
              return(
              <tbody key={key}>
                <tr>
                  <td>{formatDate(val.date)}</td>
                  <td style={getWeatherStyle(val.weatherType)}>
                    {getWeatherDescription(val.weatherType)}
                  </td>
                  <td>{val.capacity}</td>
                  <td style={getTimeStyle(val.openingTime)}>
                    {getOpenTime(val.openingTime)}
                  </td>
                  <td style={getTimeStyle(val.closingTime)}>
                    {getCloseTime(val.closingTime)}
                  </td>
                  <div className="table-btn-container">
                  <button onClick={() => getParkStatusData(val.parkStatusID)}>Edit</button>
                    </div>
                </tr>
              </tbody>
              );
            })}
        </table>
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