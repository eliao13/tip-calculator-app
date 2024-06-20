export default function TipPercentageButton({
  percentage,
  setTipPercentageHandler,
  tipPercentage,
}) {
  return (
    <button
      className={tipPercentage === percentage ? "active" : null}
      onClick={() => setTipPercentageHandler(percentage)}
    >
      {percentage}&#37;
    </button>
  );
}
