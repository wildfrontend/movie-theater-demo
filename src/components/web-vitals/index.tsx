'use client'

import { useReportWebVitals } from 'next/web-vitals'

const WebVitals: React.FC = () => {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return <></>
}

export default WebVitals