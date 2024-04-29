import './sortingIcon.scss';

const SortingIcon = ({ orderClass, lightColor = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10.5"
      height="9.5"
      viewBox="0 0 8.553 7.886"
      className={`svg-sort-icon ${lightColor ? 'light-icon' : ''} ${orderClass} `}
    >
      <g id="Action-sortcolumn" transform="translate(0.707 0.5)">
        <path
          id="Path_33574"
          data-name="Path 33574"
          d="M-2483.406,14446.812l2.273-2.273v6.885"
          transform="translate(2483.406 -14444.537)"
          className="svg-asc-icon"
        />
        <path
          id="Path_33575"
          data-name="Path 33575"
          d="M0,2.273,2.273,0V6.885"
          transform="translate(7.138 6.885) rotate(180)"
          className="svg-dsc-icon"
        />
      </g>
    </svg>
  );
};

export default SortingIcon;
