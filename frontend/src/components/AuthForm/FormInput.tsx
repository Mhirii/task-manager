interface props {
  type: string,
  label: string,
  id: string,
  name: string
}

export default function FormInput({type, label, id, name,}: props) {
  return (
    <div className={'email-input flex flex-col'}>
      <label
        htmlFor={id}
        className={`text-base font-medium text-slate-700`}
      >
        {label}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        className=
          {`rounded-lg bg-slate-300 bg-opacity-20 shadow-inner p-2
                focus:outline-none border-2
                hover:bg-opacity-75 hover:border-indigo-500 hover:border-opacity-50
                focus:bg-opacity-100 focus:border-indigo-500
                transition-all duration-300`}
        required
      />
    </div>
  )
}