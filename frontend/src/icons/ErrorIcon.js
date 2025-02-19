import * as React from "react";

const ErrorIcon = ({ width = 18, height = 18, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M10.785 3.223a2.12 2.12 0 0 0-3.642.122L1.69 12.89l-.048.128c-.386 1.116.137 2.278 1.182 2.704l.167.06c.17.052.344.083.52.093l.063-.001.024.002h10.861l.132-.01a2.125 2.125 0 0 0 1.907-2.22 2.127 2.127 0 0 0-.154-.69l-5.49-9.618-.068-.115Zm-2.269.278a.996.996 0 0 1 1.357.388l5.461 9.56.016.072c.01.05.02.117.024.186a.997.997 0 0 1-.945 1.045L3.597 14.75h-.023l-.113-.012a.997.997 0 0 1-.762-1.359l5.425-9.484.061-.098a.985.985 0 0 1 .331-.297Zm-.078 8.701c0-.31.252-.567.562-.567a.56.56 0 0 1 .563.559v.008a.563.563 0 0 1-1.125 0ZM9.55 7.646a.563.563 0 0 0-1.12.076v2.325l.005.076a.563.563 0 0 0 1.12-.076V7.722l-.005-.076Z"
      clipRule="evenodd"
    />
  </svg>
);
export default ErrorIcon;
