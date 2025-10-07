import { useEffect, useRef, useState } from 'react'
import ActionBar from "@/components/action-bar";
import LeaderBoardCard from "@/components/leader-board-card";
import LeaderBoardTable from '@/components/leader-board-table';
import { transformResults } from '@/lib/utils';
import useDeviceType from '@/lib/useDeviceType';

const API = 'https://api.quizrr.in/api/hiring/leaderboard?page=1&limit=100'

export default function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const deviceType = useDeviceType();
  const refId1 = useRef(null);
  const refId2 = useRef(null);
  const onScroll1 = () => {
    refId2.current.scrollLeft = refId1.current.scrollLeft;
  }

  const onScroll2 = () => {
    refId1.current.scrollLeft = refId2.current.scrollLeft;
  }

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        if (!mounted) return
        const items = json?.data?.results || json?.data?.data || json?.data || json || []
        setData(items)
      })
      .catch((err) => {
        if (!mounted) return
        setError(err.message || String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const userIndex = 75;
  const userRank = data[userIndex]?.rank ?? null;
  const transformedData = transformResults(data, userRank);
  const deviceBasedData = deviceType === 'desktop' ? transformedData.filter((item, id) => item.rank !== 1 && item.rank !== 2 && item.rank !== 3 && id !== userIndex) : transformedData.filter((item, id) => id !== userIndex)

  return (
    <>
      <section className={`actionbar container py-5 ${isScrolled ? "fixed top-0  left-1/2 z-50 -translate-x-1/2 bg-[#EAF3FA2F] custom-blur-1 transition-all transition-normal duration-[10] ease-in-out delay-[3] rounded-bl-[12px] rounded-br-[12px]" : ""} `} >
        <ActionBar isScrolled={isScrolled} />
      </section>

      <section className={`leaderboard container py-5 ${deviceType !== 'desktop' && "hidden"}`} >
        {loading && <p className='text-center'>Loading leaderboard...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-4 xl:gap-5 lg:gap-4">
            {data.length === 0 && <p>No leaderboard entries found.</p>}
            {[...transformedData.slice(0, 3), ...(transformedData[userIndex] ? [transformedData[userIndex]] : [])].map((user, i) => (
              <LeaderBoardCard key={user?.userId?._id || user?.rank || i} user={user} order={i} />
            ))}

          </div>
        )}
      </section>

      <section className="leaderboardtable container pt-5 pb-[100px]" >
        {loading && <p className='text-center'>Loading leaderboard...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <LeaderBoardTable data={deviceBasedData} refId={refId1} onPageScroll={onScroll1} />)}
      </section>
      
      <section className="yourscore container pt-5 fixed bottom-0  left-1/2 -translate-x-1/2 transition-all transition-normal duration-[20] ease-in-out delay-[0]" >
        {!loading && !error && isScrolled && (
          <LeaderBoardTable data={transformedData[userIndex] ? [transformedData[userIndex]] : []} refId={refId2} onPageScroll={onScroll2} />
        )}
      </section>
    </>
  )
}
