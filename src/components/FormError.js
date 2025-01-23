function FormError({ error }) {
  if (!error) return null;
  return <p className="text-red-700 text-sm font-semibold  pt-1">{error}</p>;
}

export default FormError;
