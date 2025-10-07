import { ArrowLeftIcon } from '@phosphor-icons/react'

const ActionBar = ({ isScrolled }) => {
  return (
    <div className={isScrolled ? "flex items-center" : ""}>
      <div className={`w-[40px] h-[40px] rounded-[56px] bg-brand center ${isScrolled ? "mr-5" : "mb-5"}`}>
        <ArrowLeftIcon size={24} />
      </div>
      <p className={`text-2xl font-bold  ${isScrolled ? "mb-0" : "mb-4"}`}>Leaderboard</p>
      <p className={`text-xs-12 font-medium ${isScrolled ? "hidden" : ""}`} >JEE Main Test series / Quizrr Part Test / Quizrr Part Test (QPT) - 1 (Old) / Analysis / Leaderboard</p>
    </div>
  )
}

export default ActionBar