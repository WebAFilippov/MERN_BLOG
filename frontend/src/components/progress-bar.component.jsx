export const ProgressBar = ({ value }) => {
  return (
    <div className="my-4 px-6">
      <div>
        <div className="bg-grey h-4 rounded-md overflow-hidden">
          <div
            style={{ width: `${value}%` }}
            className="bg-dark-grey flex justify-center items-center h-full text-[10px] text-grey font-bold duration-300"
          >
            {value >= 3 && `${value}%`}
          </div>
        </div>
      </div>
    </div>
  )
}
