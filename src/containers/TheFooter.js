import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://firstenergy.lk" target="_blank" rel="noopener noreferrer">First Energy SL Pvt LTd</a>
        <span className="ml-1">&copy; 2020 All rights reserved.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://inofinitylabs.com" target="_blank" rel="noopener noreferrer">Inofinity Labs</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
