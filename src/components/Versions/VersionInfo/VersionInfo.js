import "./VersionInfo.css";
function VersionInfo({ version }) {
  return (
    <div className="version-info-container">
      <div className="cocktail-ingredients">
        <h5>Ingredients:</h5>
        <ul>
          {version.ingredients &&
            version.ingredients.map(function (ingredient) {
              return (
                <div key={ingredient}>
                  <li>{ingredient}</li>
                </div>
              );
            })}
        </ul>
      </div>
      <div className="cocktail-description">
        <h5>Notes:</h5>
        <p>{version.notes ? version.notes : "N/A"} </p>
      </div>
    </div>
  );
}

export default VersionInfo;
