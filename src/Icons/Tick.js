import PropTypes from 'prop-types';

import SetIcon from './SetIcon.js';

export default function Tick(props) {

    const setIconProps = {
        ...props,
        title: 'Tick',
        viewBox: "0 0 26 26",
        pathData: "M13,0.188C5.924,0.188,0.188,5.924,0.188,13S5.924,25.813,13,25.813S25.813,20.076,25.813,13 S20.076,0.188,13,0.188z M19.736,9.035l-6.871,10.132c-0.206,0.303-0.528,0.504-0.848,0.504s-0.675-0.175-0.9-0.399l-4.032-4.033 c-0.274-0.275-0.274-0.722,0-0.996l0.996-0.998c0.274-0.272,0.722-0.272,0.995,0l2.623,2.623l5.705-8.414 c0.217-0.32,0.657-0.403,0.979-0.187l1.166,0.791C19.869,8.275,19.953,8.715,19.736,9.035z",
        description: 'Tick for to do list',
    }

    return SetIcon(setIconProps);
}

Tick.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
}

