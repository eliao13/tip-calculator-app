import { useEffect, useState } from "react";
import TipPercentageButton from "./TipPercentageButton";

export default function Main() {
  const tipPercentages = [5, 10, 15, 25, 50];
  const [bill, setBill] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [customTipPercentage, setCustomTipPercentage] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [numberOfPeopleError, setNumberOfPeopleError] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  function setTipPercentageHandler(percentage) {
    setTipPercentage(percentage);
    setCustomTipPercentage("");
  }

  function validateNumberOfPeople() {
    if (numberOfPeople && numberOfPeople == 0) {
      setNumberOfPeopleError(true);
    } else {
      setNumberOfPeopleError(false);
    }
  }

  function calculateTipAmount() {
    const tipAmount = (bill * tipPercentage) / 100;
    setTipAmount(tipAmount.toFixed(2));
    calulcateTipAmountPerPerson(tipAmount);
  }

  function calulcateTipAmountPerPerson(tipAmount) {
    const tipPerPerson = (tipAmount / numberOfPeople).toFixed(2);
    setTipAmountPerPerson(tipPerPerson);
  }

  function calculateTotalAmount() {
    const totalAmount = bill / numberOfPeople + tipAmount / numberOfPeople;
    setTotalAmount(totalAmount.toFixed(2));
  }

  function reset() {
    setBill("");
    setTipPercentage(0);
    setCustomTipPercentage("");
    setNumberOfPeople("");
    setTipAmount(0);
    setTipAmountPerPerson(0);
    setTotalAmount(0);
  }

  useEffect(() => {
    validateNumberOfPeople();
  }, [numberOfPeople]);

  useEffect(() => {
    if (bill && tipPercentage && numberOfPeople) {
      calculateTipAmount();
      calculateTotalAmount();
    }
  }, [bill, tipPercentage, numberOfPeople]);

  return (
    <main>
      <div className="container">
        <section className="calculate-section">
          <div className="bill-input">
            <label htmlFor="bill">Bill</label>
            <input
              type="number"
              id="bill"
              value={bill}
              placeholder="0"
              onChange={(e) => setBill(e.target.value)}
            />
          </div>

          <div className="tip-percentage-buttons">
            <label htmlFor="">Select Tip %</label>
            {tipPercentages.map((percentage) => (
              <TipPercentageButton
                key={percentage}
                percentage={percentage}
                setTipPercentageHandler={setTipPercentageHandler}
              />
            ))}
            <input
              placeholder="Custom"
              type="number"
              id="custom-tip-percentage"
              min={0}
              value={customTipPercentage}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setCustomTipPercentage(0);
                } else {
                  setCustomTipPercentage(e.target.value);
                  setTipPercentage(e.target.value);
                }
              }}
            />
          </div>

          <div className="people-input">
            <label htmlFor="people">Number of People</label>
            {numberOfPeopleError && (
              <p className="error-message">Can&#39;t be zero</p>
            )}
            <input
              type="number"
              id="people"
              min={0}
              placeholder="0"
              value={numberOfPeople}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setNumberOfPeople(0);
                } else {
                  setNumberOfPeople(e.target.value);
                }
              }}
            />
          </div>
        </section>
        <section className="results-section">
          <div className="tip-amount">
            <div>
              <p>Tip Amount</p>
              <p>/ person</p>
            </div>
            <p>&#36;{tipAmountPerPerson}</p>
          </div>
          <div className="total-amount">
            <div>
              <p>Total</p>
              <p>/ person</p>
            </div>
            <p>&#36;{totalAmount}</p>
          </div>
          <button onClick={() => reset()}>Reset</button>
        </section>
      </div>
    </main>
  );
}