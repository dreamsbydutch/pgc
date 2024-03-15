import { FaArrowDownLong, FaArrowUpLong, FaArrowsLeftRight } from 'react-icons/fa6'

export function rankChange(rkChange: number) {
	if (+rkChange > 0) {
		return (
			<span className="text-[#008000] flex justify-center items-center text-3xs xs:text-2xs sm:text-xs md:text-sm lg:text-base pl-0.5">
				<FaArrowUpLong />
				{Math.abs(rkChange)}
			</span>
		)
	}
	if (+rkChange < 0) {
		return (
			<span className="text-[#b2222b] flex justify-center items-center text-3xs xs:text-2xs sm:text-xs md:text-sm lg:text-base pl-0.5">
				<FaArrowDownLong />
				{Math.abs(rkChange)}
			</span>
		)
	}
	return (
		<span className="flex justify-center items-center text-3xs xs:text-2xs sm:text-xs md:text-sm lg:text-base pl-0.5">
			<FaArrowsLeftRight />
		</span>
	)
}
