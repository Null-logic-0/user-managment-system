function Input({ label, id, name, type, htmlFor }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={htmlFor} className="font-semibold text-md">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="border-slate-300 bg-transparent shadow-xl border-2 rounded-md px-4 py-3 w-full"
      />
    </div>
  );
}

export default Input;
