import { Typography } from '@mui/material'
import React, { useState } from 'react'
import InfoModal from '../../components/InfoModal'
import useGetUserData from '../../hooks/useGetUserData'
import { ResultT } from '../../modules/modelTypes'
import { resultMoney } from '../../data/money'

type ResultProps = {
  resultData: ResultT
}

const Result = ({ resultData }: ResultProps) => {
  const { resultId, date, userOneUid, userTwoUid, userOneGoals, userTwoGoals } = resultData
  const [showInfoModal, setShowInfoModal] = useState(false)
  const userOneData = useGetUserData(userOneUid)
  const userTwoData = useGetUserData(userTwoUid)

  const resultHandler = (scoredGoals: number, concededGoals: number) => {
    if (scoredGoals > concededGoals) {
      return resultMoney.win
    } else if (scoredGoals < concededGoals) {
      return resultMoney.lose
    } else {
      return resultMoney.draw
    }
  }
  return (
    <>
      <InfoModal open={showInfoModal} onClose={() => setShowInfoModal(false)} >
        <div className='h-full flex flex-col items-center gap-6 mt-8 text-white'>
          <Typography variant='h2'>Match Result</Typography>
          <Typography variant='h5'>{date}</Typography>
          <div className='flex w-full gap-4 px-4'>
            <div className='flex flex-col items-center grow gap-4 pt-2 bg-sky-800 h-72 w-72'>
              <Typography variant='h4'>{userOneData.login}</Typography>
              <Typography variant='h4'>{userOneGoals}</Typography>
              <Typography variant='h4'>+{resultHandler(userOneGoals, userTwoGoals)}</Typography>

            </div>
            <div className='flex flex-col items-center grow gap-4 pt-2 bg-sky-800 h-72 w-72'>
              <Typography variant='h4'>{userTwoData.login}</Typography>
              <Typography variant='h4'>{userTwoGoals}</Typography>
              <Typography variant='h4'>+{resultHandler(userTwoGoals, userOneGoals)}</Typography>
            </div>
          </div>
        </div>
      </InfoModal>
      <div onClick={() => setShowInfoModal(true)} className='flex-center px-4 h-12 text-2xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-xl'>
        <div className='flex flex-row'><p className='ml-2'>{userOneData.login}</p><p className='mx-2'>{userOneGoals}</p>:<p className='mx-2'>{userTwoGoals}</p><p className='mr-2'>{userTwoData.login}</p></div>
      </div>
    </>
  )
}

export default Result