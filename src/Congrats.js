import React from "react";
import languageContext from "./contexts/languageContext";
import stringModule from "./helpers/strings";
import successContext from "./contexts/successContext";

/**
 * Functional React component for congratulatory message.
 * @function
 * @returns {JSX.Element} - Rendered component (or null if `success` proptype is false)
 */
const Congrats = () => {
  const [success] = successContext.useSuccess();
  const language = React.useContext(languageContext);

  if (success) {
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
