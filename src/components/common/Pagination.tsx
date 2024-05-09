'use client'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"
import { IPagination } from "@/types/components"
import { FC } from "react"

const Paginator: FC<IPagination> = ({ quantity, updateCurrent , next, prev, current}) => {
	
	const pages = Math.ceil((quantity ?? 1) / 10)
	const qs = Array.from({ length: pages  }, (_, i) => (
		<PaginationItem  key={i}>
			<PaginationLink type="button" className="cursor-pointer" onClick={() => updateCurrent && updateCurrent(i+1)}  isActive={current == i+1 ? true :false}>
				{i+1}
			</PaginationLink>
		</PaginationItem>
	))
	
	return (
		<>
	{pages > 1 &&		
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious type="button" onClick={() => prev && current > 1 && prev()} />
					</PaginationItem>
					{qs}
					{pages > 5 &&
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					}
					<PaginationItem>
						<PaginationNext type="button" onClick={() => next && current < pages && next()}  />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			}
		</>
	)
}

export default Paginator
