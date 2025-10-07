import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const transformResults = (results,userRank) => {
    const list = Array.isArray(results) ? results : (results && typeof results === 'object' ? Object.values(results) : [])
    return (list || []).map((item, idx) => {
      const rank = item?.rank ?? idx + 1
      const name = item?.userId?.name || item?.userId?.fullName || item?.userId?.username || 'Unknown'
      const overall = item?.totalMarkScored ?? item?.marksGained ?? 0
      const accuracy = Number.isFinite(Number(item?.accuracy)) ? Number(item.accuracy) : (item?.accuracy ?? 0)
      const subj = {}
      const subjectsArray = Array.isArray(item?.subjects) ? item.subjects : (item?.subjects && typeof item.subjects === 'object' ? Object.values(item.subjects) : [])
      subjectsArray.forEach((s) => {
        const raw = s?.subjectId
        const title = raw ? (typeof raw === 'string' ? raw : raw.title || raw._id || '') : ''
        const key = String(title).toLowerCase()
        subj[key] = s?.totalMarkScored ?? 0
      })

      return {
        rank,
        name,
        profilePicture: item?.userId?.profilePicture ?? null,
        overall,
        physics: subj['physics'] ?? 0,
        chemistry: subj['chemistry'] ?? 0,
        mathematics: subj['mathematics'] ?? 0,
        accuracy: Number.isFinite(accuracy) ? Number(accuracy).toFixed(2) : String(accuracy),
        userRank
      }
    })
  }

export  function getPaginationRange(totalPages, currentPage, delta = 2) {
  const range = [];
  const rangeWithDots = [];
  let l;

 
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }


  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}
