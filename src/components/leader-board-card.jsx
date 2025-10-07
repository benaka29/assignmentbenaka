import React from 'react'
import avatar from '../assets/Avatar-1.png'
import rank1 from '../assets/Component-1.png'
import rank2 from '../assets/Component-2.png'
import rank3 from '../assets/Component-3.png'
import accuracyImage from '../assets/Q3 - Accuracy.png'
import chemImage from '../assets/Q3 - Chem.png'
import mathsImage from '../assets/Q3 - Maths.png'
import overallImage from '../assets/Q3 - Overall.png'
import physicsImage from '../assets/Q3 - Physics.png'

const cardStyle = [{
   border: "custom-border-1",
   bg: "custom-bg-1",
   text: "text-yellowDark",
   textBg: "bg-yellowLight",
   rankImage: rank1
},
{
   border: "custom-border-2",
   bg: "custom-bg-2",
   text: "text-neutralDefault",
   textBg: "bg-surfaceDim",
   rankImage: rank2
},
{
   border: "custom-border-3",
   bg: "custom-bg-3",
   text: "text-orangeNormal",
   textBg: "bg-orangeLight",
   rankImage: rank3
},
{
   border: "custom-border-4",
   bg: "custom-bg-4",
   text: "text-neutralDefault",
   textBg: "bg-surfaceDim",
   rankImage: ""
}

]

const LeaderBoardCard = ({ user, order }) => {
   const style = cardStyle[order]
   const name = user?.name || user?.userId?.name 
   const avatarUrl = user?.profilePicture ?? user?.userId?.profilePicture ?? avatar
   const rank = user?.rank ?? ''
   const overall = (user?.overall ?? user?.marks) || 0
   const maxOverall = (user?.test?.totalMarks) ?? 300
   const accuracyVal = (user?.accuracy ?? 0)
   const accuracyDisplay = Number.isFinite(Number(accuracyVal)) ? Number(accuracyVal).toFixed(2) + '%' : (accuracyVal ? String(accuracyVal) : '0.00%')

   return (
      <div className={`p-[1px] rounded-tl-3xl rounded-tr-3xl ${style.border}`}>
         <div className={`rounded-tl-3xl rounded-tr-3xl  custom-bg-1  py-5 px-4 ${style.bg}`}>
            <img src={avatarUrl} alt="avatar-image" className={`mx-auto w-8 h-8 rounded-full ${!style.rankImage ? 'mb-[28px]' : ''}`} />
            {style.rankImage && <img src={style.rankImage} alt="rank-image" className='mx-auto w-5 h-5 mt-[-3px] mb-[6px]' />}
            <p className='text-base-16 font-bold text-center mb-2'>{!(order === 3) ? name : (name + " " + "(You)")}</p>
            <div className={`mx-auto w-[82px] py-1 ${style.textBg} rounded-[16px] mb-5`}>
               <p className={`text-xs-12 ${style.text} text-center font-medium`}>{rank ? `${rank} Rank` : '1st Rank'}</p>
            </div>
            <div className='between mb-4'>
               <div className='flex items-center gap-2'>
                  <img src={overallImage} className='w-4 h-4' alt="" />
                  <p className='text-sm-14 font-medium'>Overall Score</p>
               </div>
               <p>
                  <span className='text-base-16 font-bold'>{overall}</span>/<span className='text-xs-12'>{maxOverall}</span>
               </p>
            </div>
            {user?.physics !== undefined && (
               <div className='between mb-4'>
                  <div className='flex items-center gap-2'>
                     <img src={physicsImage} className='w-4 h-4' alt="" />
                     <p className='text-sm-14 font-medium'>Phy Score</p>
                  </div>
                  <p className='text-sm-14 font-medium'>{user.physics}</p>
               </div>)}
            {user?.chemistry !== undefined && (
               <div className='between mb-4'>
                  <div className='flex items-center gap-2'>
                     <img src={chemImage} className='w-4 h-4' alt="" />
                     <p className='text-sm-14 font-medium'>Chem Score</p>
                  </div>
                  <p className='text-sm-14 font-medium'>{user.chemistry}</p>
               </div>)}
            {user?.mathematics !== undefined && (
               <div className='between mb-4'>
                  <div className='flex items-center gap-2'>
                     <img src={mathsImage} className='w-4 h-4' alt="" />
                     <p className='text-sm-14 font-medium'>Maths Score</p>
                  </div>
                  <p className='text-sm-14 font-medium'>{user.mathematics}</p>
               </div>)}
            <div className='between mb-4'>
               <div className='flex items-center gap-2'>
                  <img src={accuracyImage} className='w-4 h-4' alt="" />
                  <p className='text-sm-14 font-medium'>Accuracy</p>
               </div>
               <p className='text-sm-14 font-medium'>
                  {accuracyDisplay}
               </p>
            </div>
         </div>
      </div>
   )
}

export default LeaderBoardCard