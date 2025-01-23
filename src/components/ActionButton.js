function ActionButton({ children, action }) {
  return (
    <form action={action}>
      <button>{children}</button>
    </form>
  );
}

export default ActionButton;
