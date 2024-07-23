export const RenewalRequest = ({
  request,
  oldDoc,
  newDoc,
  onAccept,
  onReject,
}) => {
  return (
    <div className="card my-5 shadow-sm">
      {/* request title */}
      <h3 className="d-flex col-md-12 justify-content-center align-items-center mb-3">
        {request.request_type} Request
      </h3>
      {/* previous and proposed passports */}
      <div className="row">
        <div className="col-md-6">
          <h4 className="d-flex justify-content-center align-items-center">
            Old {request.request_type}
          </h4>
          {oldDoc}
        </div>
        <div className="col-md-6">
          <h4 className="d-flex justify-content-center align-items-center">
            New {request.request_type}
          </h4>
          {newDoc}
        </div>
      </div>
      {/* early renewal reason and proof document */}
      {request.reason && (
        <div className="row my-3 d-flex flex-column justify-content-center align-items-center">
          <div className="text-center">
            <p>
              <strong>Early Renewal Reason:</strong> {request.reason}
            </p>
            <p>
              <strong>Proof Document Link:</strong> {request.proof_document}
            </p>
          </div>
        </div>
      )}
      {/* accept or reject buttons */}
      <div className="row  d-flex justify-content-center align-items-center mb-3">
        <div className="col-md-8 d-flex justify-content-between">
          <button className="button" onClick={() => onReject(request)}>
            Reject
          </button>
          <button className="button" onClick={() => onAccept(request)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
