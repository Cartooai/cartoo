function Button({ label, onClick }) {
    return (
        <button onClick={onClick} className="p-4 flex items-center justify-center rounded-lg w-full">
            {label}
        </button>
    );
}

export default Button;