import { useNavigate } from "react-router-dom";
import { BaseButtonIcon, NavbarAccount } from ".";

const TheNavbar = () => {
	const isAdmin = localStorage.getItem("isAdmin") === "true";

	const navigate = useNavigate();

	const handleClick = () => {
		navigate("/");
	};

	return (
		<div>
			<div className="px-3 sm:px-4">
				<div className="flex items-center py-[12px]">
					<div className="flex flex-auto items-center">
						<BaseButtonIcon
							onClick={handleClick}
							className="hidden items-center sm:block"
							style={{ fontSize: "24px" }}
						>
							LiveVote
						</BaseButtonIcon>
					</div>

					{!isAdmin && (
						<div className="flex space-x-2">
							<NavbarAccount />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TheNavbar;
