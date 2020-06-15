import React from "react";
import PropTypes from "prop-types";
import languageContext from "./contexts/languageContext";
import stringModule from "./helpers/strings";

/**
 * Functional React component for congratulatory message.
 * @function
 * @param {object} props - React Props.
 * @returns {JSX.Element} - Rendered component (or null if `success` proptype is false)
 */
const Congrats = (props) => {
  const language = React.useContext(languageContext);
  if (props.success) {
    return (
      <div
        data-test="component-congrats"
        className="alert alert-success"
      >
        <span data-test="congrats-message">
          {stringModule.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
};
