const Spinner = ({ label = 'Loading data...' }) => {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-4">
      <div className="spinner" aria-hidden="true"></div>
      <p className="text-sm font-semibold text-[#5d6f64] dark:text-[#b7c8bd]">{label}</p>
    </div>
  )
}

export default Spinner
