import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function RouterParamsProvider(props) {
	const { mapId } = useParams(); 
	
	return (
		<>
			{React.Children.map(props.children, child => {
				return React.cloneElement(child, { canvasId: mapId })
			})}
		</>
	)
} 