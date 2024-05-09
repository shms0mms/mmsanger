"use client"
import { FC, PropsWithChildren } from "react"
import SideBar from "./sidebar/SideBar"
import Wrapper from "../ui/Wrapper"
import { IBaseLayout } from "@/types/components"

const BaseLayout: FC<PropsWithChildren<IBaseLayout>> = ({
	children,
	withCL,
	withU,
	className,
}) => {
	return (
		<>
			<div className="max-w-full  h-full m-[0_auto]">
				<div className="separator">
					<SideBar withCL={withCL} withU={withU} />
					<Wrapper className={className}>{children}</Wrapper>
				</div>
			</div>
		</>
	)
}

export default BaseLayout
