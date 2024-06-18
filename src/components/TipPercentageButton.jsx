export default function TipPercentageButton({
  percentage,
  setTipPercentageHandler,
}) {
  return (
    <button onClick={() => setTipPercentageHandler(percentage)}>
      {percentage}&#37;
    </button>
  );
}
