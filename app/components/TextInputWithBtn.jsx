import React from 'react'

const TextInputWithBtn = ({onChange, disableBtn=false,label, id, name, type = 'text', className, onClick, placeholder, buttonChild = <></>, buttonClass='', rounded='xl', ...etc }) => {
    return (
        <div>
            <div>
                <label htmlFor={id} className="block text-gray-800 font-medium text-sm">{label}</label>
                <div className="mt-0.5 flex items-center bg-white p-0.5 rounded-md">
                    <input
                        placeholder={placeholder}
                        onChange={onChange}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck='false'
                        className={`block w-full  placeholder:text-sm md:placeholder:text-sm rounded-${rounded} p-1.5 border-r-0 !rounded-r-none focus:outline-none focus:border-0 focus:ring-0 ${className}`}
                        {...etc}
                    />
                    <button disabled={disableBtn} onClick={onClick} className={`border rounded-md p-2 bg-secondary text-sm ${buttonClass}`}>
                        {buttonChild}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TextInputWithBtn