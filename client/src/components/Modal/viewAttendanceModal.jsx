import Table from "../Table/Component";
import "../../styles/model.css";

export default function ViewAttendanceModal({ show, onClose, employee, records }) {
  if (!show) return null;

  const columns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header d-flex justify-content-between align-items-center">
          <h5 className="modal-title">
            Attendance - {employee.first_name} {employee.last_name}
          </h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <div className="modal-body">
          <Table
            title=""
            data={records}
            columns={columns}
            searchEnabled={true}
            pagination={true}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
