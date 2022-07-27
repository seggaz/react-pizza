import React from "react";
import ContentLoader from "react-content-loader";

const Sceleton = (props) => (
  <ContentLoader 
	className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="269" rx="10" ry="10" width="280" height="26" /> 
    <circle cx="134" cy="126" r="125" /> 
    <rect x="156" y="358" rx="0" ry="0" width="1" height="0" /> 
    <rect x="0" y="308" rx="12" ry="12" width="280" height="88" /> 
    <rect x="0" y="421" rx="12" ry="12" width="90" height="27" /> 
    <rect x="130" y="410" rx="25" ry="25" width="152" height="46" />
  </ContentLoader>
)

export default Sceleton;