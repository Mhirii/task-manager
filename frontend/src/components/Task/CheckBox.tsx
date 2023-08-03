import {CheckOutlined} from "@ant-design/icons";


interface CheckBoxProps {
  checked: boolean
}

function CheckBox({checked}: CheckBoxProps) {
  return (
    <>
      <button
        className={`
        h-6 w-6 mt-1 bg-transparent rounded-full flex justify-center items-center
        border-t-2 ${checked ? "" : "border-r-2 "} border-b-2 border-l-2 border-slate-700
        ${checked ? "hover:border-red-700 border-emerald-700" : "hover:bg-emerald-500 hover:border-emerald-700"} hover:bg-opacity-10
        transition-all -rotate-45
        `}
      >
        <CheckOutlined
          className=
            {`${checked
              ? "opacity-100 rotate-45 scale-100 translate-x-0"
              : "opacity-0 rotate-90 scale-0 -translate-x-4"}
              transition-all text-emerald-700 text-2xl ml-3 mb-0
            `}
        />
      </button>
    </>
  )
}

export default CheckBox


// <input type="checkbox" id={id} className="hidden"
// defaultChecked={checked}
// onChange={
// () => {
//   console.log('updating state... state: ',checked)
//   setChecked((state) => !state)
//   console.log('state updated: ',checked)
//   // handleCheck()
// }
// }
// />
// <label htmlFor={id} className="check">
//   <svg width="32px" height="32px" viewBox="0 0 18 18">
//     <path
//       d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
//     <polyline points="1 9 7 14 15 4"></polyline>
//   </svg>
// </label>