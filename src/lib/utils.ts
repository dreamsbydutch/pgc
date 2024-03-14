import { type ClassValue, clsx } from "clsx"
import { useCallback, useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useCallbackQueryString(searchParams: URLSearchParams) {
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

}



export function getRkChange(rkChange: number) : {
  'change':number
  'arrow':string
  'style': {
    'color': string
  }
} {
  if (+(rkChange) > 0)  return {
    'change' : Math.abs(rkChange),
    'arrow' : 'fa-long-arrow-up',
    'style' : {
      color: 'rgb(0,128,0)',
    },
  }
  if (+(rkChange) < 0) return {
    'change' : Math.abs(rkChange),
    'arrow' : 'fa-long-arrow-down',
    'style' : {
      color: 'rgb(178,34,34)',
    },
  }
  return {
    'change' : Math.abs(rkChange),
    'arrow' : 'fa-arrows-h',
    'style' : {
      color: '',
    },
  }
}


export function formatMoney(number:number) : string {
    number = Number(number)
    if (Math.abs(number) >= 1e6) {
        return '$' + (number / 1e6).toFixed(1) + 'M';
    } else if (Math.abs(number) >= 1e4) {
        return '$' + (number / 1e3).toFixed(0) + 'k';
    } else if (Math.abs(number) === 0 || isNaN(number)) {
        return '-'
    } else {
        return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    }
}

export function addRankingSuffix(rank:number) : string {
  if (rank % 10 === 1 && rank % 100 !== 11) {
    return rank + 'st';
  } else if (rank % 10 === 2 && rank % 100 !== 12) {
    return rank + 'nd';
  } else if (rank % 10 === 3 && rank % 100 !== 13) {
    return rank + 'rd';
  } else {
    return rank + 'th';
  }
}