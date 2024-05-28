import styled from "styled-components";

const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.primary};
	text-decoration: none;
	font-weight: bold;

	&:hover {
		text-decoration: underline;
		color: ${({ theme }) => theme.colors.emphasis};
	}
`;

export default StyledLink;
