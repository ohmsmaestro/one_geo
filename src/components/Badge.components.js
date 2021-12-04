import styled, { css } from 'styled-components';

import { lighten } from 'polished';
import { Theme } from "../utils/theme";

export const Badge = styled.span`
	font-size: 10px;
	background-color: ${(props) =>
		props.color
			? lighten(0.45, props.color)
			: lighten(0.45, Theme.PrimaryColor)};
	border-radius: ${(props) =>
		props.borderRadius ? props.borderRadius : '10px'};
	color: ${(props) => (props.color ? props.color : Theme.PrimaryColor)};
	padding: ${(props) => (props.pad ? props.pad : '5px 10px')};
	border: 1px solid
		${(props) =>
			props.color
				? lighten(0.3, props.color)
				: lighten(0.3, Theme.PrimaryColor)};
	font-weight: 600;
	${(props) =>
		props.display &&
		css`
			display: ${(props) => props.display};
		`}
	${(props) =>
		props.cursor &&
		css`
			cursor: ${(props) => props.cursor};
		`}
	${(props) =>
		props.margin &&
		css`
			margin: ${(props) => props.margin};
		`}
	${(props) =>
		props.textAlign &&
		css`
			text-align: ${(props) => props.textAlign};
		`}
`;