export default function Button({ children, onClick, type = "button", style }) {
  return (
    <button type={type} onClick={onClick} className="btn" style={style}>
      {children}
    </button>
  );
}