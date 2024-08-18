import { useEffect, useState } from "react";
import { getDataFromServer } from "../Utility/api";
import ExpenseTracker from "./ExpenseTracker";

function ShowData() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [sum, setSum] = useState();
  const [rahulspent, setRahulspent] = useState(0);
  const [rameshspent, setRameshspent] = useState(0);
  const [showform, setShowForm] = useState(false);

  var rahulspent1 = 0;
  var rameshspent1 = 0;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        setSum(data.reduce((result, currentValue) => result + parseFloat(currentValue.price), 0));
        Shares(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchMenu();
  });

  const Shares = (data) => {
    data.map((share) =>
      share.payeeName === "Rahul"
        ? (rahulspent1 = rahulspent1 + parseFloat(share.price))
        : (rameshspent1 = rameshspent1 + parseFloat(share.price))
    );
    setRahulspent(rahulspent1);
    setRameshspent(rameshspent1);
  };

  const success = () => {
    setShowForm(false);
  };
  const cancel = () => {
    setShowForm(false);
  };

  return (
    <>
      <header id="page-Header">Expense Tracker</header>
      <button id="Add-Button" onClick={() => setShowForm(true)}>
        Add
      </button>
      {showform && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <>
        <div className="use-inline date header-color">Date</div>
        <div className="use-inline header-color">Product Purchased</div>
        <div className="use-inline price header-color">Price</div>
        <div className="use-inline header-color" style={{ width: 112 }}>
          Payee
        </div>
      </>
      {items &&
        items.map((user, index) => (
          <div key={index}>
            <div className="use-inline date">{user.billDate}</div>
            <div className="use-inline">{user.product}</div>
            <div className="use-inline price">{user.price}</div>
            <div className={`use-inline ${user.payeeName}`}>
              {user.payeeName}
            </div>
          </div>
        ))}
      <hr />
      <div className="use-inline ">Total: </div>
      <span className="use-inline total">{sum}</span> <br />
      <div className="use-inline ">Rahul Paid: </div>
      <span className="use-inline total Rahul">{rahulspent}</span> <br />
      <div className="use-inline ">Ramesh Paid: </div>
      <span className="use-inline total Ramesh">{rameshspent}</span> <br />
      <span className="use-inline payable">
        {rahulspent > rameshspent ? "Pay to Rahul " : "Pay to Ramesh"}
      </span>
      <span className="use-inline payable price">
        {" "}
        {Math.abs((rahulspent - rameshspent) / 2)}
      </span>
      {error && <>{error?.message}</>}
    </>
  );
}
export default ShowData;
